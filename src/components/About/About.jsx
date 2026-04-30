import authorPhoto from "@src/images/Author_Photo.jpeg";

export default function About() {
  return (
    <>
      <div className="about">
        <img className="about__author-photo" src={authorPhoto} alt="Author" />

        <div className="about__content">
          <h3 className="about__title">Sobre o autor</h3>
          <p className="about__description">
            Olá! Me chamo Bianca Baccin e estou finalizando o curso de Web
            Development da TripleTen, onde aprendi sobre HTML, CSS, JavaScript,
            React, Node.js, Autorização e Autenticação e muito mais!
          </p>
          <p className="about__description">
            No momento, sou líder de um time de recepção, mas estou me dedicando
            para entrar no mundo do desenvolvimento web full-stack. Estou
            animada com as oportunidades para aplicar meu conhecimento e crescer
            profissionalmente!
          </p>
        </div>
      </div>
    </>
  );
}
