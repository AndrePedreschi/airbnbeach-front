import './ProductResgister.scss'
import { distCalc } from "../utils/distCalc";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import Swal from 'sweetalert2'
import { Plus, CaretLeft } from 'phosphor-react'
import { useAuth } from "../contexts/auth";
import { DragAndDrop } from '../Components/DragAndDrop';
import successIcon from '../assets/success.gif'
import { Loading } from '../Components/Loading';


export function ProductRegister() {
    const navigate = useNavigate();
    const { urlBase, auth, loading } = useAuth();
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const [cepDados, setCepDados] = useState('');
    const [posicaoEndereco, setPosicaoEndereco] = useState('');
    const [posicaoCentro, setPosicaoCentro] = useState('');
    const [posicaoDistancia, setDistancia] = useState();
    const [nomePropriedade, setNomePropriedade] = useState("");
    const [tituloPropriedade, setTituloPropriedade] = useState("");
    const [categoria, setCategoria] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numeroPropriedade, setNumeroPropriedade] = useState('');
    const [cidade, setCidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [politicas, setPoliticas] = useState({});
    const [urlImagem, setUrlImagem] = useState([]);
    const [inputImagemCount, setInputImagemCount] = useState(['']);


    useEffect(() => {
        setCep(cep.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2").slice(0, 9))
        if (cep.length > 9) {
            setCep(cep.slice(0, 9))
        }
        if (cep.length < 8) {
            setEndereco('')
        }
        if (cep.length === 8 && !cep.includes('-')) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
                if (response.data.erro === true) {
                    setEndereco('')
                    setCidade('')
                    setCepDados('')
                    setStatus({ type: 'cepError', message: 'CEP inválido' })
                } else {
                    setCepDados(response.data)
                    setEndereco(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`)
                    setCidade(`${response.data.localidade} - ${response.data.uf}`)
                }
            }, (error) => {
                setEndereco('')
            });
        }
    }, [cep])

    function getLocalizacao() {

        let enderecoCentro = `${cepDados.localidade}, ${cepDados.uf}`
        

        //https://brasilapi.com.br/docs#tag/CEP-V2
        axios.get(`https://brasilapi.com.br/api/cep/v2/${cepDados.cep}`).then((response) => {
            setPosicaoEndereco({
                lat: response.data.location.coordinates.latitude,
                long: response.data.location.coordinates.longitude
            })
        }, (error) => { });

        axios.get(`https://nominatim.openstreetmap.org/search?q=${enderecoCentro}&limit=1&format=json`).then((response) => {
            setPosicaoCentro({
                lat: response.data[0].lat,
                long: response.data[0].lon
            })
        }, (error) => { });


        //let apiKey = 'AIzaSyBiepDOJfdSFAnqL9wo8LKuOx6w2mS5DMQ'
        //let enderecoRecontruido =`${endereco.slice(0,endereco.lastIndexOf(',')+1)} ${numeroPropriedade},${endereco.slice(endereco.lastIndexOf(',')+1, endereco.length)}`
        
        /* axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${enderecoRecontruido}&key=${apiKey}`).then(
            (response) => {
                setPosicaoEndereco({
                    lat: response.data.results[0].geometry.location.lat,
                    long: response.data.results[0].geometry.location.lng
                })
            },
            (error) => {
                if (error.code === 'ERR_NETWORK') return toast.error('Ocorreu um erro, por favor recarregue a página.');
            }
        ) */
    }

    useEffect(() => {
        if (posicaoEndereco !== '' && posicaoCentro !== '') {
            setDistancia(distCalc(posicaoEndereco.lat, posicaoEndereco.long, posicaoCentro.lat, posicaoCentro.long))
        }
    }, [posicaoEndereco, posicaoCentro])


    function cleanForm() {
        setCepDados('')
        setPosicaoEndereco('')
        setPosicaoCentro('')
        setDistancia('')
        setNomePropriedade('')
        setTituloPropriedade('')
        setCategoria('')
        setCep('')
        setEndereco('')
        setNumeroPropriedade('')
        setCidade('')
        setDescricao('')
        setCaracteristicas('')
        setPoliticas({})
        setUrlImagem([])
        setInputImagemCount([''])
        setStatus({
            type: '',
            message: ''
        })
    }

    function validarUrlImagem(urlRecebida, index) {
        if (urlRecebida !== undefined) {
            if (urlRecebida.url !== '') {
                let url = urlRecebida.url
                const formatosValidos = [".jpg", ".jpeg", ".png", ".gif"];
                const extensao = url.substring(url.lastIndexOf("."));
                const ehHttp = url.startsWith("http://");
                const ehHttps = url.startsWith("https://");

                if (!(ehHttp || ehHttps) || !formatosValidos.includes(extensao)) {
                    return (
                        setStatus({ type: `urlImagemError${index}`, message: 'Link de imagem inválido' }),
                        setShow(true)
                    )
                } else {
                    return (
                        setShow(false),
                        setStatus('')
                    )
                }
            } else {
                return (
                    setStatus({ type: `urlImagemError${index}`, message: 'Preencha o campo com o link de uma imagem' }),
                    setShow(true)
                )
            }
        } else {
            return (
                setStatus({ type: `urlImagemError${index}`, message: 'Preencha o campo com o link de uma imagem' }),
                setShow(true)
            )
        }
    }

    function validate(input) {

        switch (input) {
            case 'nomePropriedade':
                if (nomePropriedade === '') return setStatus({ type: 'nomePropriedadeError', message: 'Este campo é obrigatório' });
                if (nomePropriedade.length < 7) return setStatus({ type: 'nomePropriedadeError', message: 'O nome precisa ter mais de 7 letras' });
                if (nomePropriedade == undefined || nomePropriedade === null) return setStatus({ type: 'nomePropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'categoria':
                if (categoria === '' || categoria === 'Selecione a categoria') return setStatus({ type: 'categoriaError', message: 'Este campo é obrigatório' });
                if (categoria == undefined || categoria === null) return setStatus({ type: 'categoriaError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'cep':
                if (cep === '') return setStatus({ type: 'cepError', message: 'Este campo é obrigatório' });
                if (cep === undefined || cep === null) return setStatus({ type: 'cepError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'endereco':
                if (endereco === '') return setStatus({ type: 'enderecoError', message: 'Este campo é obrigatório' });
                if (endereco === undefined || endereco === null) return setStatus({ type: 'enderecoError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'cidadePropriedade':
                if (cidade === '') return setStatus({ type: 'cidadePropriedadeError', message: 'Este campo é obrigatório' });
                if (cidade === undefined || cidade === null) return setStatus({ type: 'cidadePropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'numeroPropriedade':
                if (numeroPropriedade === '') return setStatus({ type: 'numeroPropriedadeError', message: 'Este campo é obrigatório' });
                if (numeroPropriedade === undefined || numeroPropriedade === null) return setStatus({ type: 'numeroPropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'tituloPropriedade':
                if (tituloPropriedade === '') return setStatus({ type: 'tituloPropriedadeError', message: 'Este campo é obrigatório' });
                if (tituloPropriedade === undefined || tituloPropriedade === null) return setStatus({ type: 'tituloPropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'descricao':
                if (descricao === '') return setStatus({ type: 'descricaoError', message: 'Este campo é obrigatório' });
                if (descricao === undefined || descricao === null) return setStatus({ type: 'descricaoError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                break;

            case 'politicasRegra':
                if (politicas.regras === '') return setStatus({ type: 'politicasRegraError', message: 'Este campo é obrigatório' });
                if (politicas.regras === undefined || politicas.regras === null) return setStatus({ type: 'politicasRegraError', message: 'Este campo é obrigatório' });
                break;

            case 'politicasSaude':
                if (politicas.saude === '') return setStatus({ type: 'politicasSaudeError', message: 'Este campo é obrigatório' });
                if (politicas.saude === undefined || politicas.saude === null) return setStatus({ type: 'politicasSaudeError', message: 'Este campo é obrigatório' });
                break;

            case 'politicasCancelamento':
                if (politicas.cancelamento === '') return setStatus({ type: 'politicasCancelamentoError', message: 'Este campo é obrigatório' });
                if (politicas.cancelamento === undefined || politicas.cancelamento === null) return setStatus({ type: 'politicasCancelamentoError', message: 'Este campo é obrigatório' });
                break;

            default:
                if (nomePropriedade === '') return setStatus({ type: 'nomePropriedadeError', message: 'Este campo é obrigatório' });
                if (nomePropriedade.length < 7) return setStatus({ type: 'nomePropriedadeError', message: 'O nome precisa ter mais de 7 letras' });
                if (nomePropriedade === undefined || nomePropriedade === null) return setStatus({ type: 'nomePropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (categoria === '' || categoria === 'Selecione a categoria') return setStatus({ type: 'categoriaError', message: 'Este campo é obrigatório' });

                if (categoria === undefined || categoria === null) return setStatus({ type: 'categoriaError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (cep === '') return setStatus({ type: 'cepError', message: 'Este campo é obrigatório' });
                if (cep === undefined || cep === null) return setStatus({ type: 'cepError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (endereco === '') return setStatus({ type: 'enderecoError', message: 'Este campo é obrigatório' });
                if (endereco === undefined || endereco === null) return setStatus({ type: 'enderecoError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (cidade === '') return setStatus({ type: 'cidadePropriedadeError', message: 'Este campo é obrigatório' });
                if (cidade === undefined || cidade === null) return setStatus({ type: 'cidadePropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (numeroPropriedade === '') return setStatus({ type: 'numeroPropriedadeError', message: 'Este campo é obrigatório' });
                if (numeroPropriedade === undefined || numeroPropriedade === null) return setStatus({ type: 'numeroPropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (tituloPropriedade === '') return setStatus({ type: 'tituloPropriedadeError', message: 'Este campo é obrigatório' });
                if (tituloPropriedade === undefined || tituloPropriedade === null) return setStatus({ type: 'tituloPropriedadeError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (descricao === '') return setStatus({ type: 'descricaoError', message: 'Este campo é obrigatório' });
                if (descricao === undefined || descricao === null) return setStatus({ type: 'descricaoError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });

                if (politicas.regras === '') return setStatus({ type: 'politicasRegraError', message: 'Este campo é obrigatório' });
                if (politicas.regras == undefined || politicas.regras === null) return setStatus({ type: 'politicasRegraError', message: 'Este campo é obrigatório' });

                if (politicas.saude === '') return setStatus({ type: 'politicasSaudeError', message: 'Este campo é obrigatório' });
                if (politicas.saude === undefined || politicas.saude === null) return setStatus({ type: 'politicasSaudeError', message: 'Este campo é obrigatório}' });

                if (politicas.cancelamento === '') return setStatus({ type: 'politicasCancelamentoError', message: 'Este campo é obrigatório' });
                if (politicas.cancelamento === undefined || politicas.cancelamento === null) return setStatus({ type: 'politicasCancelamentoError', message: 'Este campo é obrigatório' });

                if (urlImagem.length <= 4) return setStatus({ type: `urlImagemContainerError`, message: 'Adicione pelo menos 5 imagens' });
                if (urlImagem.length === 0) return setStatus({ type: `urlImagemError0`, message: 'Preencha o campo com o link de uma imagem' });
                break;
        }
        return true;
    }


    function criarPropriedade() {

        let url = `${urlBase}/produtos`

        let data = {
            id: "666",
            nome: nomePropriedade,
            descricao: {
                titulo: tituloPropriedade,
                texto: descricao
            },
            favorito: false,
            estrelas: 3,
            avaliacao: 5,
            localizacao: {
                endereco: `${cepDados.logradouro}, ${numeroPropriedade} - ${cepDados.bairro}, ${cepDados.localidade} - ${cepDados.uf}, ${cepDados.cep}`,
                distancia: parseInt(posicaoDistancia),
                coordenadas: `[${posicaoEndereco.lat}, ${posicaoEndereco.long}]`,
                centro: `[${posicaoCentro.lat}, ${posicaoCentro.long}]`
            },
            detalhes: {
                regrasDaCasa: politicas.regras,
                politicaDeCancelamento: politicas.cancelamento,
                saudeESeguranca: politicas.saude
            },
            imagens: urlImagem,

            caracteristicas: caracteristicas,
            cidade: {
                nome: cepDados.localidade,
            },
            categoria: {
                qualificacao: categoria,
            },
            reservas: []
        }

        axios.defaults.headers.post['Authorization'] = `Bearer ${auth}`;
        axios.post(url, data).then((response) => {

            Swal.fire({
                title: 'Sua propriedade foi criada com sucesso!',
                width: '360',
                color: '#545776',
                imageUrl: successIcon,
                focusConfirm: false,
                confirmButtonColor: '#1dbeb4',
                confirmButtonText: 'Ok',
            }).then((result) => {
                navigate('/home')
                cleanForm();
            })


        }, (error) => {
            console.log(error);
            //if (error.status == 403) return toast.error('Erro ao cadastrar, por favor recarregue a página');
            if (error.code === 'ERR_NETWORK') return toast.error('Infelizmente não foi possivel cadastrar. Por favor, tente novamente mais tarde.');
        });
    }


    function registrarCidade() {
        if (cepDados.localidade) {

            let data = {
                nome: cepDados.localidade,
                pais: "Brasil"
            }
            axios.post(`${urlBase}/cidades`, data).then((response) => {
                criarPropriedade()
            }, (error) => {
                console.log(error.code);
            });
        }else{
            return
        }
    }



    function handleSubmit(e) {
        e.preventDefault();
        if (!validate() || show) return;

        let arrayCidadeBanco=[]
        axios.get(`${urlBase}/cidades`).then((response) => {
           
            response.data.forEach((item) => {
                if (item.nome !== null && item.nome !== undefined && item.nome == cepDados.localidade) {
                    return arrayCidadeBanco.push('1')
                } else {
                    return arrayCidadeBanco.push('2')
                }
            })

            if (arrayCidadeBanco.includes('1')) {
  
                criarPropriedade()
            } else {
      
                registrarCidade()
            }
        }, (error) => {
            console.log(error.code);
        });
    }

    function addInput() {
        setInputImagemCount([...inputImagemCount, ...['']])
        setStatus('')
    }


    return (
        <section className='productRegisterContainer'>
            <Loading loading={loading} />
            <section className="headerSection">
                <div className="headerText">
                    <p className='title h1'>Administração</p>
                </div>
                <Link to={"/home"}><CaretLeft className="caretLeftIcon" size={32} color="#ffffff" weight="bold" /></Link>
            </section>

            <section className='adminFormSection'>
                <h1 className='h1'>Criar propriedade</h1>

                <form className="propertFormRegister" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <label htmlFor="nomePropriedade" className="text-small">Nome da Propriedade</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="Hotel Hermínio Fraga"
                            name="nomePropriedade"
                            id="nomePropriedade"
                            value={nomePropriedade}
                            onChange={(e) => setNomePropriedade(e.target.value)}
                            onBlur={() => validate('nomePropriedade')}
                        />
                        {status.type === 'nomePropriedadeError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'categoriaError' ? <p className="text-small errorMsgSpacing">'</p> : ""}
                    </div>

                    <div className="inputs">
                        <label htmlFor="categoria" className="text-small">Categoria</label>
                        <select name="categoria" value={categoria} id="categoria" className='selectCategoriaStyle' onChange={(e) => setCategoria(e.target.value)} onBlur={() => validate('categoria')}>
                            <option className='optionStyle' value={'Selecione a categoria'}>Selecione a categoria</option>
                            <option value={'Hotéis'}>Hotel</option>
                            <option value={'Hostels'}>Hostel</option>
                            <option value={'Apartamentos'}>Apartamento</option>
                            <option value={'Pousadas'}>Pousada</option>
                        </select>
                        {status.type === 'categoriaError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'nomePropriedadeError' ? <p className="text-small errorMsgSpacing">'</p> : ""}
                    </div>

                    <div className="inputs">
                        <label htmlFor="cep" className="text-small">Cep</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="09121-740"
                            name="cep"
                            id="cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={() => validate('cep')}
                        />
                        {status.type === 'cepError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'enderecoError' ? <p className="text-small errorMsgSpacing">{status.message}</p> : ""}
                    </div>

                    <div className="inputs">
                        <label htmlFor="endereco" className="text-small">Endereço</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="Av. dos Guararibes"
                            name="endereco"
                            id="endereco"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            onBlur={() => validate('endereco')}
                        />
                        {status.type === 'enderecoError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'cepError' ? <p className="text-small errorMsgSpacing">{status.message}</p> : ""}
                    </div>

                    <div className="inputs">
                        <label htmlFor="cidadePropriedade" className="text-small">Cidade</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="Cidade"
                            name="cidadePropriedade"
                            id="cidadePropriedade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            onBlur={() => validate('cidadePropriedade')}
                        />
                        {status.type === 'cidadePropriedadeError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'numeroPropriedadeError' ? <p className="text-small errorMsgSpacing">{status.message}</p> : ""}
                    </div>

                    <div className="inputs">
                        <label htmlFor="numeroPropriedade" className="text-small">Número</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="1864"
                            name="numeroPropriedade"
                            id="numeroPropriedade"
                            value={numeroPropriedade}
                            onChange={(e) => setNumeroPropriedade(e.target.value)}
                            onBlur={() => validate('numeroPropriedade')}
                        />
                        {status.type === 'numeroPropriedadeError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        {status.type === 'cidadePropriedadeError' ? <p className="text-small errorMsgSpacing">{status.message}</p> : ""}
                    </div>

                    <div className="inputs tituloDescricao">
                        <label htmlFor="tituloPropriedade" className="text-small">Título</label>
                        <input
                            className="text-small"
                            type="text"
                            placeholder="Hospede-se na Pousada Ondas de Copacabana"
                            name="tituloPropriedade"
                            id="tituloPropriedade"
                            value={tituloPropriedade}
                            onChange={(e) => setTituloPropriedade(e.target.value)}
                            onBlur={() => validate('tituloPropriedade')}
                        />
                        {status.type === 'tituloPropriedadeError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    </div>

                    <div className="inputs descricao">
                        <label htmlFor="descricao" className="text-small">Descrição</label>
                        <textarea
                            className='text-small inputText'
                            placeholder='Escreva aqui'
                            name="descricao" id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            onBlur={() => validate('descricao')}
                            onFocus={getLocalizacao}
                        ></textarea>
                        {status.type === 'descricaoError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    </div>

                    <p className='h2 subTitulos'>Adicionar Atributos</p>

                    <section className="dragAndDrop">
                        <DragAndDrop filteredData={(valueReturned) => setCaracteristicas(valueReturned)} />
                    </section>

                    <p className='h2 subTitulos'>Politicas do produto</p>

                    <div className='politicasContainer'>
                        <div className="inputs politicasDescricao">
                            <p className='h3'>Regras da casa</p>
                            <label htmlFor="politicasRegra" className="text-small">Descrição</label>
                            <textarea
                                className='text-small inputText'
                                placeholder='Escreva aqui'
                                name="politicasRegra"
                                id="politicasRegra"
                                value={politicas.regras}
                                onChange={(e) => setPoliticas({ ...politicas, ...{ regras: e.target.value } })}
                                onBlur={() => validate('politicasRegra')}
                            ></textarea>
                            {status.type === 'politicasRegraError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        </div>

                        <div className="inputs politicasDescricao">
                            <p className='h3'>Saúde e segurança</p>
                            <label htmlFor="politicasSaude" className="text-small">Descrição</label>
                            <textarea
                                className='text-small inputText'
                                placeholder='Escreva aqui'
                                name="politicasSaude"
                                id="politicasSaude"
                                value={politicas.saude}
                                onChange={(e) => setPoliticas({ ...politicas, ...{ saude: e.target.value } })}
                                onBlur={() => validate('politicasSaude')}
                            ></textarea>
                            {status.type === 'politicasSaudeError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        </div>

                        <div className="inputs politicasDescricao">
                            <p className='h3'>Políticas de cancelamento</p>
                            <label htmlFor="politicasCancelamento" className="text-small">Descrição</label>
                            <textarea
                                className='text-small inputText'
                                placeholder='Escreva aqui'
                                name="politicasCancelamento"
                                d="politicasCancelamento"
                                value={politicas.cancelamento}
                                onChange={(e) => setPoliticas({ ...politicas, ...{ cancelamento: e.target.value } })}
                                onBlur={() => validate('politicasCancelamento')}
                            ></textarea>
                            {status.type === 'politicasCancelamentoError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                        </div>
                    </div>

                    <p className='h2 subTitulos'>Carregar imagens</p>

                    <section className='uploadImageSection'>
                        {inputImagemCount && inputImagemCount.map((item, index) => (
                            <div key={index}>
                                <div className="inputs addImageSection">
                                    <input
                                        className="text-small"
                                        type="text"
                                        placeholder="Insira https://..."
                                        name="urlImagem"
                                        onChange={(e) => setUrlImagem(Object.values({ ...urlImagem, [index]: { url: e.target.value } }))}
                                        onBlur={() => { validarUrlImagem(urlImagem[index], index) }
                                        }
                                    />

                                    <button
                                        type='button'
                                        className='addFild'
                                        onClick={addInput}
                                        disabled={show || !(inputImagemCount.length - 2 < index) || urlImagem[index] === undefined || urlImagem.length === 0}
                                    >
                                        <Plus className='plusIcon' color="#ffffff" weight="bold" />
                                    </button>
                                </div>

                                {status.type === `urlImagemError${index}` ? <p className="text-small errorMsg">{status.message}</p> : ""}
                            </div>
                        ))}
                        {status.type === `urlImagemContainerError` ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    </section>
                    <button type='submit' className='btnAdmin'>Cadastrar</button>
                </form>
            </section>
        </section>
    )
}