

function RecordStoreAbstractInterface(){
    return {
        create, 
        read, 
        update, 
        purge
    }
}

function create(id){ throw Error("Not implemented") }
function read(workout){ throw Error("Not implemented") }
function update(workout){ throw Error("Not implemented") }
function purge(workout){ throw Error("Not implemented") }

export default RecordStoreAbstractInterface;