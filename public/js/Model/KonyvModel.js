class KonyvModel {
    #konyvekTomb = [];
    #konyvekTombB = [];
    constructor(token) {
        this.token = token
    }

    adatTorol(i) {
        this.index=0;
        for (const item of this.#konyvekTomb) {
            
            if(parseInt(i) != parseInt(item.id)){
                this.#konyvekTombB.push(item);
            }
            
        }
        this.#konyvekTomb = this.#konyvekTombB;
        this.#konyvekTombB=[];
        
    }

    getKonyvek(){
        return this.#konyvekTomb;
    }

    adatBe(vegpont, myCallBack) {
        fetch(vegpont, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                
                this.#konyvekTomb = data;
                
                myCallBack(this.#konyvekTomb);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    adatUj(vegpont, adat) {
        fetch(vegpont, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':this.token,
            },
            body: JSON.stringify(adat),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Új adat"+ data)
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    adatModosit(vegpont,adat) {
        console.log(adat)
        console.log("Módosít "+vegpont)
        vegpont+="/" + adat.id;
        fetch(vegpont, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':this.token,
            },
            body: JSON.stringify(adat),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Módotsítottam"+ data.updatedAT)
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    adatTorol(vegpont,adat) {
        console.log("Töröltem: ")
        console.log(adat)
        vegpont+="/" + adat.id;
        console.log(vegpont)
        fetch(vegpont, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN':this.token,
            },
        })
            .then()
            .then(() => {
                console.log("Sikeres törlés")
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
}

export default KonyvModel;