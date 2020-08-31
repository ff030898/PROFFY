import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem() {
    return (

        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/45288456?s=460&u=f260e75c9c597e1da0648b57b28c5d2789432603&v=4" alt="Fabrício Ferreira" />
                <div>
                    <strong>Fabrício Ferreira</strong>
                    <span>Matemática</span>
                </div>
            </header>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        <br /><br />
        Maecenas sed enim ut sem viverra aliquet. Mauris commodo quis imperdiet massa tincidunt nunc.
        Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Cursus vitae congue mauris rhoncus.
        Ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Donec ultrices tincidunt arcu non sodales.

        </p>

            <footer>
                <p>Preço/Hora
                <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="WhatsApp" />
                Entrar em contato
            </button>
            </footer>

        </article>

    )
}
export default TeacherItem;