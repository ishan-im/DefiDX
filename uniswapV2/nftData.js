const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/8LnblEI1j7KhAQ1kNC8IkZzi9lR-2nLg");


const wallet = new ethers.Wallet(provider); // Replace with your private key

const factoryContractAddress = "0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4";
const factoryContractABI = []
const factoryContract = new ethers.Contract(factoryContractAddress, factoryContractABI);

async function getNFTData() {
  try {
    // Step 1: Get a list of token IDs owned by the factory contract
    const factoryAddress = factoryContract.address;
    const balance = await factoryContract.functions.balanceOfBatch([factoryAddress], [0]);

    for (let i = 0; i < balance.length; i++) {
      const tokenId = balance[i];
      const tokenContract = new ethers.Contract(tokenId, []); // Replace with the token contract ABI

      // Step 2: Get Token Metadata
      const tokenURI = await tokenContract.functions.URI(tokenId);
      const tokenName = await tokenContract.functions.name();
      const tokenSymbol = await tokenContract.functions.symbol();

      // Step 3: Get Total Supply
      const totalSupply = await tokenContract.functions.totalSupply();

      // Step 4: Get Contract Metadata
      const contractMetadata = await tokenContract.functions.contractURI();

      // Step 5: Get Creator and Ownership Information
      const creators = await tokenContract.functions.creators();
      const owner = await tokenContract.functions.owner();

      console.log("Token ID:", tokenId.toString());
      console.log("Token URI:", tokenURI);
      console.log("Token Name:", tokenName);
      console.log("Token Symbol:", tokenSymbol);
      console.log("Total Supply:", totalSupply.toString());
      console.log("Contract Metadata:", contractMetadata);
      console.log("Creators:", creators);
      console.log("Owner:", owner);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getNFTData();
