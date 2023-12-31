import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,    
        })
    }

    updateChar = () => {
        this.setState({ loading: true, error: false });
        const id = this.marvelService.random();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
        }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
            <div className="randomchar__smart">
                {content} {errorMessage} {spinner}
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={this.updateChar}
                >
                <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
            </div>
        )};
    }

    const View = ({ char }) => {
        const { name, description, thumbnail, homepage, wiki } = char;
        return (
        <div className="randomchar__block">
            {thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? (
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit: 'contain' }} />
                ) : (
                <img src={thumbnail} alt="Random character" className="randomchar__img" />
                )}
            <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
                </a>
            </div>
            </div>
        </div>
    );
};

export default RandomChar;