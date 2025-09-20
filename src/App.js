import { useEffect, useState } from "react";
import { games, links, members, slider } from "./data";

export default function App() {
  const [membersList, setMembersList] = useState(members);

  return (
    <div className="app">
      <Header />
      <div className="slider-container">
        <Slider
          key={slider.id}
          id={slider.id}
          images={slider.images}
          direction={slider.direction}
        />
      </div>
      <About />
      <Members membersList={membersList} />
      <Games />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1 className="logo">الضبعاويه 🐺</h1>

      <ul className="list">
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.href}>
              <span>{link.icon}</span>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

function Slider({ images }) {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides([...images, ...images]);
  }, [images]);

  return (
    <>
      {slides.map((slide, index) => (
        <div key={index} className="slide scrollLeft">
          <img src={slide} alt="sd" />
        </div>
      ))}
    </>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <h2 className="heading">من نحن</h2>
      <p>
        قديما منذ سنوات كان مجموعة من الاصدقاء ذاهبون لقضاء بعض الوقت فى مكان
        يدعى بورتو فى بورسعيد قبل الوصول الى المكان كان الجميع سعداء بوقتهم الى
        ان قال احد الاشخاص حد فيكم عارف الضبعه و المناصره و الجرابعة وهذه
        الاماكن النائية ومن هنا جاء الاسم الضبعاويه وذلك بسبب الشعور بأنا لسنا
        من سكان بورتو وانما نحن من سكان قرية الضبعه المتسللين الى بورتو
      </p>
    </section>
  );
}

function Members({ membersList }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortBy, setSortBy] = useState("football");

  let sortedMembers;

  if (sortBy === "football") {
    sortedMembers = membersList
      .slice()
      .sort((a, b) => Number(a.football) - Number(b.football));
  }
  if (sortBy === "wolfteam") {
    sortedMembers = membersList
      .slice()
      .sort((a, b) => Number(a.wolfteamRank) - Number(b.wolfteamRank));
  }
  if (sortBy === "fifaRank") {
    sortedMembers = membersList
      .slice()
      .sort((a, b) => Number(a.fifaRank) - Number(b.fifaRank));
  }
  return (
    <section className="members">
      <h2 className="heading">الاعضاء</h2>

      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"football"}>ترتيب حسب الكورة</option>
          <option value={"wolfteam"}>ترتيب حسب ولف تيم</option>
          <option value={"fifaRank"}>ترتيب حسب فيفا</option>
        </select>
      </div>
      <div className="wrapper">
        <div className="container">
          {sortedMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </div>
      </div>

      {selectedCard && (
        <Modal selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      )}
    </section>
  );
}

function MemberCard({ member, setSelectedCard }) {
  function handleSelectCard(id) {
    setSelectedCard(id);
  }

  return (
    <div className="member-card" onClick={() => handleSelectCard(member.id)}>
      <img src={member.image} alt={member.name} width={200} />
      <h3>{member.name}</h3>
      <small>{member.famous}</small>
      <p>{member.job}</p>
    </div>
  );
}

function Modal({ selectedCard, setSelectedCard }) {
  const member = members.find((member) => member.id === selectedCard);

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={member.image} alt={member.name} />
        <h4>{member.name}</h4>
        <p>{member.famous}</p>
        <p>{member.faculty}</p>
        <p>{member.job}</p>

        <p>{member.description}</p>
      </div>
      <button className="close-btn" onClick={() => setSelectedCard(null)}>
        إغلاق
      </button>
    </div>
  );
}

function Games() {
  return (
    <section id="games">
      <h2 className="heading">الالعاب</h2>

      <div className="games-wrapper">
        <div className="games ">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} />
      <span>{game.name}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <small>© 2025 eldb3awya - All rights reserverd</small>
      <em>Made with 💛 by Abdo_elradad </em>
    </footer>
  );
}
