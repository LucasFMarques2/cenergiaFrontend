import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  DashboardContainer,
  FiltersContainer,
  ChartCard,
  ExportButton,
  Select,
  ChartGrid,
} from "./style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [bases, setBases] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  
  useEffect(() => {
    async function fetchBases() {
      try {
        const response = await api.get("/bases");
        setBases(response.data);
      } catch (err) {
        console.error("Erro ao carregar bases", err);
        setBases([]);
      }
    }

    async function fetchDepartamentos() {
      try {
        const response = await api.get("/departamentos");
        setDepartamentos(response.data);
      } catch (err) {
        console.error("Erro ao carregar departamentos", err);
        setDepartamentos([]);
      }
    }

    fetchBases();
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await api.get("/formularios");
        setFormData(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados do formulário", err);
        setFormData([]);
      }
    }

    fetchFormData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = formData.filter((item) => {
        const matchesBase = selectedBase ? item.base === selectedBase : true;
        const matchesDepartamento = selectedDepartamento
          ? item.departamento === selectedDepartamento
          : true;
        return matchesBase && matchesDepartamento;
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [formData, selectedBase, selectedDepartamento]);

  const calculateAverage = (field, departamento) => {
    const filteredByDept = filteredData.filter((item) => item.departamento === departamento);
    const validData = filteredByDept.filter((item) => item[field] !== null && item[field] !== undefined);
    const sum = validData.reduce((acc, item) => acc + item[field], 0);
    return validData.length > 0 ? sum / validData.length : 0;
  };

  const calculateYesPercentage = (field, departamento) => {
    const filteredByDept = filteredData.filter((item) => item.departamento === departamento);
    const validData = filteredByDept.filter((item) => item[field] !== null && item[field] !== undefined);
    const yesCount = validData.filter((item) => item[field] === "sim").length;
    return validData.length > 0 ? (yesCount / validData.length) * 100 : 0;
  };

  const groupBySectorAndDepartment = () => {
    const grouped = {};

    filteredData.forEach((item) => {
      const key = `${item.base}-${item.departamento}`;
      if (!grouped[key]) {
        grouped[key] = {
          base: item.base,
          departamento: item.departamento,
        };
      }
    });

    return Object.values(grouped);
  };

  const groupedData = groupBySectorAndDepartment();

  const barChartDataInternet = {
    labels: groupedData.map((item) => `${item.base} - ${item.departamento}`),
    datasets: [
      {
        label: "Velocidade Média",
        data: groupedData.map((item) =>
          calculateAverage("veloc_internet", item.departamento)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const barChartDataVpnWiFi = {
    labels: groupedData.map((item) => `${item.base} - ${item.departamento}`),
    datasets: [
      {
        label: "Uso de VPN (%)",
        data: groupedData.map((item) =>
          calculateYesPercentage("usa_vpn", item.departamento)
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Computador Ligado no Wi-Fi (%)",
        data: groupedData.map((item) =>
          calculateYesPercentage("comput_ligado_wi_fi", item.departamento)
        ),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const pieChartDataSites = {
    labels: [...new Set(filteredData.map((item) => item.servico_utilizado))],
    datasets: [
      {
        data: [...new Set(filteredData.map((item) => item.servico_utilizado))].map(
          (servico) =>
            filteredData.filter((item) => item.servico_utilizado === servico)
              .length
        ),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A",
        ],
      },
    ],
  };

  const pieChartDataProblemas = {
    labels: [...new Set(filteredData.map((item) => item.princ_problemas))],
    datasets: [
      {
        data: [...new Set(filteredData.map((item) => item.princ_problemas))].map(
          (problema) =>
            filteredData.filter((item) => item.princ_problemas === problema)
              .length
        ),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A",
        ],
      },
    ],
  };

  const exportToPDF = async () => {
    const doc = new jsPDF("landscape", "px", "a4");
    const element = document.getElementById("charts-container");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 10, 10, 580, 400);
    doc.addPage();
    doc.addImage(imgData, "PNG", 10, 10, 580, 400);

    doc.save("dashboard.pdf");
  };

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>

      <FiltersContainer>
        <Select
          value={selectedBase}
          onChange={(e) => setSelectedBase(e.target.value)}
        >
          <option value="">Todas as Bases</option>
          {bases.map((base) => (
            <option key={base.id} value={base.nome}>
              {base.nome}
            </option>
          ))}
        </Select>

        <Select
          value={selectedDepartamento}
          onChange={(e) => setSelectedDepartamento(e.target.value)}
        >
          <option value="">Todos os Departamentos</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.nome}>
              {departamento.nome}
            </option>
          ))}
        </Select>
      </FiltersContainer>

      <ExportButton onClick={exportToPDF}>Exportar como PDF</ExportButton>

      <ChartGrid id="charts-container">
        <ChartCard>
          <h2>Velocidade da Internet</h2>
          <Bar data={barChartDataInternet} />
        </ChartCard>

        <ChartCard>
          <h2>Uso de VPN e Computador Ligado no Wi-Fi</h2>
          <Bar data={barChartDataVpnWiFi} />
        </ChartCard>

        <ChartCard>
          <h2>Serviços e Sites Mais Utilizados</h2>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <Pie data={pieChartDataSites} />
          </div>
        </ChartCard>

        <ChartCard>
          <h2>Problemas Frequentes</h2>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <Pie data={pieChartDataProblemas} />
          </div>
        </ChartCard>
      </ChartGrid>
    </DashboardContainer>
  );
}

export default Dashboard;
