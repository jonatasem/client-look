import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="container-header">
            <div className='header-logo'>
                <h1>Look</h1>
                <p>Filmes e Séries à vontade</p>
            </div>
        </header>
    );
};

export default Header;