import "./About.css";
import authorPhoto from "@src/images/Author_Photo.jpeg";

export default function About() {
  return (
    <div className="about">
      <img className="about__author-photo" src={authorPhoto} alt="Author" />

      <div className="about__content">
        <h3 className="about__title">About the author</h3>
        <p className="about__description">
          Hello! My name is Bianca Baccin, and I'm finishing the Web Development
          course at TripleTen, where I learned about HTML, CSS, JavaScript,
          React, Node.js, Authorization and Authentication, and much more!
        </p>
        <p className="about__description">
          I'm working hard to enter the world of full-stack web development, and
          I'm excited about the opportunities to apply my knowledge and grow
          professionally!
        </p>
      </div>
    </div>
  );
}
