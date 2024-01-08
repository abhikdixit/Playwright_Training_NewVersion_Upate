const getAllAddressIds = async (token) => {
    let ids = []
    const baseUrl = "https://demo.spreecommerce.org";
    const url = `${baseUrl}/api/v2/storefront/account/addresses`;
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      };
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        let numIds = data.meta.count;
        for (let i = 0; i < numIds; i++){
            ids.push(data.data[i].id)
        }
        
        return ids;

      } catch (error) {
        console.error(error);
      }
}

export default getAllAddressIds;