import axios from "axios";

const firebaseDB = axios.create({
    baseURL: 'https://pier-6482b-default-rtdb.firebaseio.com/',
    // If your database requires authentication, add your access token
    // params: { auth: 'your_access_token' }
});


const putFire = async (network, tokenData, address) => {
    // const tokenData = {
    //     name: "Dai Stablecoin",
    //     symbol: "DAI",
    //     decimals: 18,
    //     logo: "../assets/images/tokens/dai.png"
    // };

    // const network = "Base";
    // const address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

    await firebaseDB.put(`tokens/${network}/${address}.json`, tokenData)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

const getFire = async (network, address) => {
    // const network = "Base";
    // const address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
    try {
        const response = await firebaseDB.get(`tokens/${network}/${address}.json`)
        return response.data || {}
    } catch (error) {
        return {}
    }
}

const getAllFire = async () => {
    try {
        const response = await firebaseDB.get(".json")
        const tokens = response.data.tokens

        const result = [];
        Object.entries(tokens).forEach(([network, tokensByNetwork]) => {
            Object.entries(tokensByNetwork).forEach(([address, { decimals, name, symbol }]) => {
                result.push({
                    network,
                    address,
                    name,
                    symbol,
                    decimals,
                    logo: `../assets/images/tokens/${symbol.toLowerCase()}.png`
                });
            });
        });
        console.log(result)
        return result;
    } catch (error) {
        
    }
}

const updateFire = async (network, address, updateData) => {
    // const updateData = {
    //     name: "Updated Dai Stablecoin Name"
    // };

    // const network = "Base";
    // const address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

    await firebaseDB.patch(`tokens/${network}/${address}.json`, updateData)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

const createOrUpdateSafely = async (network, newData, address) => {
    const currentData = await getFire(network, address);
    const updatedData = { ...currentData, ...newData };
    await putFire(network, updatedData, address)
}

const deleteFire = async (network, address) => {
    // const network = "Base";
    // const address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

    await firebaseDB.delete(`tokens/${network}/${address}.json`)
        .then(response => console.log("Token deleted successfully"))
        .catch(error => console.error(error));
}

export {putFire, getFire, updateFire, deleteFire, getAllFire, createOrUpdateSafely}
