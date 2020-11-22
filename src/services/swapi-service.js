class SwapiService {
    _apiBase = 'https://swapi.dev/api';
  
    async getResourse(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return res.json();
    }
  
    async getAllPeople() {
      const res = await this.getResourse(`/people/`)
      return res.results;
    }
  
    getPerson(id) {
      return this.getResourse(`/people/${id}`)
    }
  
    async getAllPLanets() {
      const res = await this.getResourse(`/planets/`)
      return res.results;
    }
  
    getPlanet(id) {
      return this.getResourse(`/starships/${id}`)
    }
  
    async getAllStarships() {
      const res = await this.getResourse(`/starships/`)
      return res.results;
    }
  
    getStarship(id) {
      return this.getResourse(`/planets/${id}`)
    }
  }
  
  const swapi = new SwapiService();
  
  swapi.getAllPLanets().then((people) => {
    people.forEach((data) => {
      console.log(data.name);
    })
  })
  