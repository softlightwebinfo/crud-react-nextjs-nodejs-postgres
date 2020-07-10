const Pools = require('pg').Pool;
// @ts-ignore
const pool = new Pools({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mypassword',
    port: 5442,
});
export const api = (server) => {
    server.get("/api/clients", (_, res) => {
        pool.query('SELECT * FROM client ORDER BY createddate desc', [], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        });
    });
    server.get("/api/client/:id", (req, res) => {
        pool.query('SELECT * FROM client where id=$1', [req.params.id], (error, results) => {
            if (error) {
                return res.status(404).json("No se ha encontrado el cliente")
            }
            res.status(200).json(results.rows[0])
        });
    });
    server.post("/api/client", (req, res) => {
        const {name, address, phone} = req.body;
        pool.query("INSERT INTO client(name,address,phone) values($1,$2,$3) returning *", [name, address, phone], (error, results) => {
            if (error) {
                return res.status(500).json("el telefono es incorrecto")
            }
            res.status(200).json(results.rows[0])
        });
    });
    server.put("/api/client/:id", (req, res) => {
        const {name, address, phone} = req.body;
        pool.query("UPDATE client SET name=$1,address=$2,phone=$3 WHERE id=$4 returning *", [name, address, phone, req.params.id], (error, results) => {
            if (error) {
                return res.status(500).json("el telefono es incorrecto")
            }
            res.status(200).json(results.rows[0])
        });
    });
    server.delete("/api/client/:id", (req, res) => {
        pool.query("DELETE from client where id=$1", [req.params.id], (error) => {
            if (error) {
                return res.status(500).json("Error, no se ha podido eliminar")
            }
            res.status(200).json({
                success: true,
            })
        });
    });
};
