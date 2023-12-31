import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterList: [],
            loading: true,
            error: false,
            charactersToDisplay: 9,
        };
    }

    nineCharacters = new MarvelService();

    componentDidMount() {
        this.listOfNine();
    }

    CharShowcase = (char) => {
        const { name, thumbnail, id } = char;
        return (
            <li key={id} className="char__item" 
                onClick={() => this.props.onCharSelected(id)}>
                {thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? (
                <img src={thumbnail} alt={name} style={{ objectFit: 'contain' }} />
                ) : (
                <img src={thumbnail} alt={name}/>)
                }
                <div className="char__name">{name}</div>
            </li>
        );
    }

    listOfNine = () => {
        const promises = [];
        const { charactersToDisplay } = this.state;

        for (let i = 0; i < charactersToDisplay; i++) {
            promises.push(this.nineCharacters.getCharacter(this.nineCharacters.random()));
        }

        Promise.all(promises)
            .then(data => {
                this.setState(prevState => ({
                    characterList: [...prevState.characterList, ...data], // Добавьте новых персонажей к уже существующим
                    loading: false,
                }));
            })
            .catch(error => {
                this.listOfNine();
            });
    }

    handleLoadMore = () => {
        this.setState(prevState => ({
            charactersToDisplay: prevState.charactersToDisplay + 9,
            loading: true,
        }), () => {
            this.listOfNine();
        });
    }

    
    render() {
        const { loading, error, characterList } = this.state;

        if (error) {
            return <div>Error occurred</div>;
        }

        const spinner = loading ? <Spinner /> : null;
        const content = characterList.map(char => this.CharShowcase(char));

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                <div className="char__flex">
                    {spinner} 
                </div>
                <button className="button button__main button__long" onClick={this.handleLoadMore}>
                     <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
