import { useState, useEffect } from "react";
import { 
  PainelContainer, 
  AsideContainer, 
  ContentContainer, 
  InputContainer, 
  AddButton, 
  DropdownItem, 
  MenuToggle,
  ScrollableList,
  DropdownSection
} from "./styles";
import Dashboard from "../../components/Deashboard";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";

export function Painel() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [bases, setBases] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [newBase, setNewBase] = useState("");
  const [newDepartamento, setNewDepartamento] = useState("");
  const { signOut } = useAuth()

  function handleSignOut(){
    signOut()
    navigation("/")
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [basesRes, departamentosRes] = await Promise.all([
          api.get("/bases", { signal: controller.signal }),
          api.get("/departamentos", { signal: controller.signal })
        ]);
        setBases(basesRes.data);
        setDepartamentos(departamentosRes.data);
      } catch (err) {
        if (!err.name === 'AbortError') {
          console.error("Erro ao carregar dados:", err);
        }
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);


    const handleAdd = async (type) => {
    const endpoint = type === 'base' ? '/bases' : '/departamentos';
    const value = type === 'base' ? newBase : newDepartamento;
  
    if (!value.trim()) {
      console.error('O campo não pode estar vazio.');
      return;
    }
  
    try {
      const response = await api.post(endpoint, { nome: value });
  
      if (type === 'base') {
        setBases((prevBases) => [...prevBases, response.data]);
        setNewBase('');
      } else {
        setDepartamentos((prevDepartamentos) => [...prevDepartamentos, response.data]);
        setNewDepartamento('');
      }
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  };
  
  const handleDelete = async (type, id) => {
    const endpoint = type === 'base' ? `/bases/${id}` : `/departamentos/${id}`;
  
    try {
      await api.delete(endpoint);
  
      if (type === 'base') {
        setBases((prevBases) => prevBases.filter((base) => base.id !== id));
      } else {
        setDepartamentos((prevDepartamentos) =>
          prevDepartamentos.filter((departamento) => departamento.id !== id)
        );
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };
  

  useEffect(() => {
    if (isAsideOpen) {
      document.body.style.overflow = "hidden"; // Impede o scroll no body
    } else {
      document.body.style.overflow = ""; // Restaura o scroll
    }

    return () => {
      document.body.style.overflow = ""; // Limpeza ao desmontar
    };
  }, [isAsideOpen]);

  return (
    <PainelContainer>
      <MenuToggle onClick={() => setIsAsideOpen(!isAsideOpen)}>
        {isAsideOpen ? '✕' : '☰'}
      </MenuToggle>

      <AsideContainer $isOpen={isAsideOpen}>
        <button type="button" onClick={handleSignOut}>
          Logoff
        </button>

        <DropdownSection open>
          <summary>Bases</summary>
          <InputContainer>
            <input
              type="text"
              placeholder="Nova Base"
              value={newBase}
              onChange={(e) => setNewBase(e.target.value)}
            />
            <AddButton onClick={() => handleAdd('base')}>+</AddButton>
            <ScrollableList>
                {bases.map((base) => (
                    <DropdownItem key={base.id}>
                    {base.nome}
                    <button onClick={() => handleDelete('base', base.id)}>🗑️</button>
                    </DropdownItem>
                ))}
            </ScrollableList>

          </InputContainer>
        </DropdownSection>

        <DropdownSection open>
          <summary>Departamentos</summary>
          <InputContainer>
            <input
              type="text"
              placeholder="Novo Departamento"
              value={newDepartamento}
              onChange={(e) => setNewDepartamento(e.target.value)}
            />
            <AddButton onClick={() => handleAdd('departamento')}>+</AddButton>
            <ScrollableList>
            {departamentos.map((departamento) => (
                <DropdownItem key={departamento.id}>
                {departamento.nome}
                <button onClick={() => handleDelete('departamento', departamento.id)}>🗑️</button>
                </DropdownItem>
            ))}
            </ScrollableList>
          </InputContainer>
        </DropdownSection>
      </AsideContainer>

      <ContentContainer onClick={() => setIsAsideOpen(false)}>
        <h1>Bem-vindo ao Painel de Admin</h1>
        <Dashboard />
      </ContentContainer>
    </PainelContainer>
  );
}