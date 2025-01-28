import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ContentContainer, FormContainer, Forms } from "./style";

export function Formulario() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [bases, setBases] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchBases() {
      try {
        const response = await api.get("/bases");
        setBases(response.data);
      } catch (err) {
        setBases([]);
        console.error("Erro ao carregar bases", err);
      }
    }

    async function fetchDepartamentos() {
      try {
        const response = await api.get("/departamentos");
        setDepartamentos(response.data);
      } catch (err) {
        setDepartamentos([]);
        console.error("Erro ao carregar departamentos", err);
      }
    }

    fetchBases();
    fetchDepartamentos();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/formularios", data);
      if( response.status === 201){
        setSuccess(true);
        setError(null);
        reset()
        console.log("Formulário enviado com sucesso:", response.status,  response.data);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao enviar formulário');
      console.error("Erro ao enviar formulário:", err);
      setSuccess(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContentContainer>
          <Forms>
            <label>Nome completo
              <input
                {...register("nome_completo", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.nome_completo ? 'red' : '' }}
              />
              {errors.nome_completo && <span>{errors.nome_completo.message}</span>}
            </label>

            <label>Email
              <input
                {...register("email", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.email ? 'red' : '' }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </label>

            <label>Matricula
              <input
                {...register("matricula", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.matricula ? 'red' : '' }}
              />
              {errors.matricula && <span>{errors.matricula.message}</span>}
            </label>

            <label>Base
              <select
                {...register('base', { required: "Campo obrigatório" })}
                style={{ borderColor: errors.base ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                {Array.isArray(bases) && bases.length > 0 ? (
                  bases.map((base) => (
                    <option key={base.id} value={base.nome}>{base.nome}</option>
                  ))
                ) : (
                  <option value="">Carregando bases...</option>
                )}
              </select>
              {errors.base && <span>{errors.base.message}</span>}
            </label>

            <label>Departamento
              <select
                {...register('departamento', { required: "Campo obrigatório" })}
                style={{ borderColor: errors.departamento ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                {Array.isArray(departamentos) && departamentos.length > 0 ? (
                  departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.nome}>{departamento.nome}</option>
                  ))
                ) : (
                  <option value="">Carregando departamentos...</option>
                )}
              </select>
              {errors.departamento && <span>{errors.departamento.message}</span>}
            </label>

            <label>Velocidade da Internet
              <select
                {...register("veloc_internet", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.veloc_internet ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors.veloc_internet && <span>{errors.veloc_internet.message}</span>}
            </label>
          </Forms>

          <Forms>
            <label>Principais problemas
              <select
                {...register("princ_problemas", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.princ_problemas ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                <option value="Lentidão">Lentidão</option>
                <option value="Quedas constantes">Quedas constantes</option>
                <option value="Sinal fraco">Sinal fraco</option>
                <option value="Nenhum">Nenhum</option>
              </select>
              {errors.princ_problemas && <span>{errors.princ_problemas.message}</span>}
            </label>

            <label>Qual serviço mais utilizado
              <select
                {...register("servico_utilizado", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.servico_utilizado ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                <option value="Prime">Prime</option>
                <option value="Sienge">Sienge</option>
                <option value="Email">Email</option>
              </select>
              {errors.servico_utilizado && <span>{errors.servico_utilizado.message}</span>}
            </label>

            <label>Qual site mais acessado
              <select
                {...register("site_acessado", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.site_acessado ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                <option value="Youtube">Youtube</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
              </select>
              {errors.site_acessado && <span>{errors.site_acessado.message}</span>}
            </label>

            <label>Computador está ligado no wi-fi?
              <select
                {...register("comput_ligado_wi_fi", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.comput_ligado_wi_fi ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              {errors.comput_ligado_wi_fi && <span>{errors.comput_ligado_wi_fi.message}</span>}
            </label>

            <label>Usa VPN?
              <select
                {...register("usa_vpn", { required: "Campo obrigatório" })}
                style={{ borderColor: errors.usa_vpn ? 'red' : '' }}
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              {errors.usa_vpn && <span>{errors.usa_vpn.message}</span>}
            </label>
          </Forms>
        </ContentContainer>
        <input className="inputButton" type="submit" value="Enviar" />
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Formulário enviado com sucesso!</p>}
    </FormContainer>
  );
}
