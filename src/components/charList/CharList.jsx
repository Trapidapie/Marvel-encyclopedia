import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    nineCharacters = new MarvelService();

    state = {
        characterList: [], // Добавьте состояние для хранения массива персонажей
    };

    componentDidMount() {
        this.listOfNine();
    }

    CharShowcase = (char) => {
        const { name, thumbnail } = char;
        return (
            <li className="char__item" key={char.id}>
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
        this.nineCharacters.get9Characters()
            .then(data => {
                this.setState({ characterList: data }); // Сохраните данные в состоянии
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    }

    render() {
        const { characterList } = this.state; // Получите массив персонажей из состояния

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characterList.map(char => this.CharShowcase(char))} {/* Используйте map для отображения элементов */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
