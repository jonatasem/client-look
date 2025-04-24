import React from 'react';
import MovieList from './components/MovieList/MovieList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
    return (
        <section className='container-app'>
            <Header />
            <MovieList />
            <Footer />
        </section>
    );
};

export default App;