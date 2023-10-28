import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#"// eslint-disable-line jsx-a11y/anchor-is-valid
                >
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#" id="theame" // eslint-disable-line jsx-a11y/anchor-is-valid
                    >Dark/White</a></li> 
                    /
                    <li><a href="#"// eslint-disable-line jsx-a11y/anchor-is-valid
                    >Characters</a></li>
                    /
                    <li><a href="#"// eslint-disable-line jsx-a11y/anchor-is-valid
                    >Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;