class fireDAO {

    static errorr(where, msg) {
        document.querySelector(where).innertext = msg;
    }
    
    // codigo para consultar um documento
    static async queryOne(collection) {
        // dados da consulta
        const query = {email:'D@ddd'  };
        const options = {
            // Sort matched documents in descending order by rating
            sort: { "nome": -1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0},
        };
        //realiza a consulta
        const result = await collection.findOne(query, options);
        // resultados da consulta

        return result;
    }

    

}

module.exports = fireDAO