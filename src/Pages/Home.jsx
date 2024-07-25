import axios from "axios";
import Cookies from "js-cookie"
import { Delete, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer, toas, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/*

Data de inicio e fim;
Texto do conteudo;

Salvar isso em um local

*/


const auth_cookie = Cookies.get('auth');

function NotAuthenticated() {
    return (
        <div>
            <h1>Not Authenticated!</h1>
        </div>
    )
}

function Authenticated() {
    var user = Cookies.get('user')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const [isFiltered, setFiltered] = useState(false)
    const [filter, setFilter] = useState('');

    const [quadros, setQuadros] = useState([]);


    const notify = (typeNot, messsage) => toast(messsage, {
        type: typeNot
    })


    useEffect(() => {
        axios.get('http://192.168.0.103:80/quadros').then((res) => {
            setQuadros(res.data)
        })
        notify('success', 'Success to login! Welcome back.')


    }, [])
    function createTask() {

        if (title == '') {
            alert('Insert something in here...')
        } else {
            axios.post('http://192.168.0.103:80/create', {
                title: title,
                content: content,
                inicio: dataInicio,
                end: dataFim
            }).then((res) => {
                console.log(res);
            })
    
            const newArray = [
                ...quadros, title
            ]
            setQuadros(newArray)
    
            setTitle('')
            setContent('')
            setDataFim('')
            setDataInicio('')
        }
    }

    function deleteTask(id) {
        console.log('trying delete item: ', id)
        axios.post('http://192.168.0.103:80/delete', {
            id: id
        }).then((res) => {
            console.log(res)
        })

        const index_item = quadros.indexOf(id)
        const newArray = [
            ...quadros.slice(0, index_item),
            ...quadros.slice(index_item + 1)
        ];
        setQuadros(newArray);
    }

    
    return(
        <div>
            <h1 className="text-center text-2xl mt-10 mb-10">WelcomeBack Mr.{user.toUpperCase()}</h1>

            <ToastContainer />
            <div className="flex flex-1">
                <ul className="grid grid-cols-1 w-1/3 gap-5 items-center m-auto">

                    <h1 className="text-3xl">Crie um novo quadro:</h1>

                    <input value={title} onChange={(e) => {setTitle(e.target.value)}}  type="text" placeholder="Titulo do conteudo..." className="border border-zinc-400 p-2" />
                    <input value={content} onChange={(e) => {setContent(e.target.value)}} type="text" placeholder="Conteudo do conteudo..." className="border border-zinc-400 p-2" />
                    <input value={dataInicio} onChange={(e) => {setDataInicio(e.target.value)}} type="text" placeholder="Data de inicio..." className="border border-zinc-400 p-2" />
                    <input value={dataFim} onChange={(e) => {setDataFim(e.target.value)}} type="text" placeholder="Data de fim..." className="border border-zinc-400 p-2" />
                    <button className="p-5 bg-emerald-700 text-zinc-200 rounded-lg" style={{width: '100%'}} onClick={createTask}>Criar</button>
                </ul>


                <ul  className="flex justify-center flex-col items-center border border-zinc-200 m-auto w-1/2 rounded-lg shadow-zinc-200 shadow-md mt-10 p-10">
                    <h1>Seus quadros:</h1>
                    <input value={filter} onChange={(e) => {setFiltered(true); setFilter(e.target.value)}} type="text" placeholder="filtrar quadros" className="border border-zinc-400 p-3 text-sm rounded-lg w-3/4" />
                    {
                        isFiltered ? quadros.filter(name => name.includes(filter)).map(filteredName => (<li className="border text-zinc-100 bg-emerald-900  text-center p-4 rounded-md w-2/4 mt-5">{filteredName}</li>)) : quadros.map((c, i) => {
                            return (
                                <div key={i} className="w-3/4 flex mt-5" style={{alignItems: 'center', gap: '5px', justifyContent: 'cent'}}>
                                    <li className="border text-zinc-100 bg-emerald-900  text-center p-4 rounded-md" style={{width: '100%'}}>
                                    {c}
                                    </li>
                                    <span onClick={() => { deleteTask(c) }} className="bg-red-600 p-3 rounded-lg text-red-900 hover:bg-red-800 text-red-500">
                                        <X />
                                    </span>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default function Home({auth}) {
    

    if (auth_cookie === 'ok') {
        auth = true;
    } else {
        auth = false;
    }
        
    return(
        auth ? <Authenticated /> : <NotAuthenticated />
    )
}