const db = require('../sqldb.js');


module.exports.getAllContent = async () => {
   try {
    const response = await db.query('SELECT * FROM contents');
    return response;
   } catch (error) {
    console.error('Error in contentService.getAllContent', error);
    return error;
   }
};

module.exports.getContentById = async (id) => {
    try {
     const response = await db.query('SELECT * FROM contents WHERE id = ?', [id]);  // Use prepared statement to prevent SQL injection
     return response;
    } catch (error) {
     console.error('Error in contentService.getContentById', error);
     return error;
    }
 };

 module.exports.deleteContentById = async (id) => {
    try {
     const [{ affectedRows }] = await db.query('DELETE FROM contents WHERE id = ?', [id]);  // Use prepared statement to prevent SQL injection
     if (affectedRows) {
         return affectedRows;   
     }else{
        console.log('Cannot find the record');
     }
    } catch (error) {
     console.error('Error in contentService.deleteContentById', error);
     return error;
    }
 };

 module.exports.createContent = async (body) =>{
    try {
        const [response] = await db.query("INSERT INTO contents (title, contents) VALUES( ?, ?)", [body.title, body.contents ]);
        return response;
    } catch (error) {
        console.log(error); 
    }
 }

 module.exports.updateContent = async (body,id) =>{
    try {
        const [response] = await db.query(
          "UPDATE contents SET title = ?, contents = ? WHERE id = ?",
          [body.title, body.contents, id]
        );
        if (response.affectedRows > 0) {
          console.log("Record updated successfully");
        } else {
          console.log("No record found with the specified ID");
        }
      } catch (err) {
        console.error("Error updating record:", err);
      }
 }