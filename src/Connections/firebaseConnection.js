import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, set, push } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAIfexxx4ph0uNuU2vOpPMcr54Vy7WhlDo",
    authDomain: "who-s-that-pokemon-9a09e.firebaseapp.com",
    projectId: "who-s-that-pokemon-9a09e",
    storageBucket: "who-s-that-pokemon-9a09e.appspot.com",
    messagingSenderId: "421478312930",
    appId: "1:421478312930:web:d85fe718a58d4184bde7bb",
    measurementId: "G-QY9BQB7867",
    databaseURL: "https://who-s-that-pokemon-9a09e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

// Obtenção da instância do Realtime Database
const database = getDatabase(app);
// Função para acessar o App, através do login

const generations = [
    {

        first: 1,
        last: 151,

    },
    {

        first: 152,
        last: 251,

    },
    {

        first: 252,
        last: 386,

    },
    {

        first: 387,
        last: 493,

    },
    {

        first: 494,
        last: 649,

    },
    {

        first: 650,
        last: 721,

    },
    {

        first: 722,
        last: 809,

    },
]

async function getSortPokemon() {

    let randomGen = Math.floor(Math.random() * generations.length)
    let pokemonAleatorio = Math.floor(Math.random() * (generations[randomGen].last - generations[randomGen].first + 1)) + generations[randomGen].first;

    return pokemonAleatorio;

}

async function getPokemonData(index) {

    let url = `https://pokeapi.co/api/v2/pokemon/${index}/`
    let pokeData = await fetch(url).then(data => data.json())

    return pokeData;

}

async function getUserData(userId) {

    const userRef = ref(database, `usuarios/${userId}`);
    let userData;

    await get(userRef).then((snapshot) => {

        userData = snapshot.val()

    })

    return userData

}

async function getLast(userId) {

    const userRef = ref(database, `usuarios/${userId}/last`);
    let userData;

    await get(userRef).then((snapshot) => {

        userData = snapshot.val()

    })

    return userData

}

async function setLast(userId, atual, newPokemon) {

    // const histRef = ref(database, `usuarios/${userId}/historico`);
    const lastRef = ref(database, `usuarios/${userId}/last`);

    console.log(atual)

    if(!newPokemon){
        
        await set(lastRef, atual)

    }else{

        console.log("Caiu no else")

        let randomGen = Math.floor(Math.random() * generations.length)
        let pokemonAleatorio = Math.floor(Math.random() * (generations[randomGen].last - generations[randomGen].first + 1)) + generations[randomGen].first;

        await set(lastRef, { index: pokemonAleatorio, status: "Jogando", chutes: 1, chutesDados: "" })

    }

    // await push(histRef, atual)

    return getLast(userId)

}

async function login(email, password, setLoading, setUser) {

    setLoading(true)

    let userId
    const auth = getAuth();
    let newEmail = email.toLowerCase()
    newEmail = newEmail.replace(" ", "")

    let userCredential;
    await signInWithEmailAndPassword(auth, newEmail, password).then((user) => userCredential = user).catch(response => alert(response));

    // Obter o ID do usuário logado
    if (userCredential) {
        userId = userCredential.user.uid;

        // Exemplo de acesso a dados no Realtime Database
        const userRef = ref(database, `usuarios/${userId}`);
        let userData;

        await get(userRef).then((snapshot) => {

            userData = snapshot.val()

        })

        // await AsyncStorage.setItem('@useruid', userId)
        setUser(userId)
    }

    setLoading(false)

}

async function cadastro(email, password, setLoading, setUser) {

    setLoading(true)

    let userId
    const auth = getAuth();
    let newEmail = email.toLowerCase()
    newEmail = newEmail.replace(" ", "")

    let userCredential;
    await createUserWithEmailAndPassword(auth, newEmail, password).then((user) => userCredential = user).catch(response => alert(response));

    // Obter o ID do usuário logado
    if (userCredential) {
        userId = userCredential.user.uid;

        // Exemplo de acesso a dados no Realtime Database
        const userRef = ref(database, `usuarios/${userId}`);

        await set(userRef, {

            email: email,
            senha: password,
            // historico: [],
            chutesDados: [],
            last: {

                index: 25,
                status: "Jogando"

            },

        })

        // await AsyncStorage.setItem('@useruid', userId)
        setUser(userId)
    }

    setLoading(false)

}

export { login, cadastro, getLast, setLast, getUserData }