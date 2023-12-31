class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1c3a935b45ceef86ddb4ce6ecc5210b4';
    _baseOffset = 210;

    random = () => Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let descr = char.description
        if(descr === "")
            descr = "no description for this char";
        else if (descr.length >= 100) {
            const truncated = descr.substring(0, 100)
            const lastSpaceIndex = truncated.lastIndexOf(" ");
            descr = truncated.substring(0, lastSpaceIndex) + " ...";
        }
        
        return{
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;