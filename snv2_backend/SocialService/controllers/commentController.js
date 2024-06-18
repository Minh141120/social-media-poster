const axios = require('axios')

const getAllComments = async (req, res) => {
    await axios.get("https://app.ayrshare.com/api/comments/Ut1fWU6XkqkMayHGnJZ", {
        headers: {
            "Authorization": `Bearer EE3QDJT-MPAM0WA-Q8PCV90-WQRGZ37`
        }
    })
    .then((response) => {
        console.log(response.data);
        res.json(response.data)
    })
    .catch((error) => {
        console.error('There was a problem with the axios request:', error);
    });
    
}
export default getAllComments
