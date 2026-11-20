const navigation = [...document.querySelectorAll('.section-nav a')];
const sections = navigation.map(link => document.getElementById(link.hash.slice(1)));
const skills = document.getElementById('skills');

function showSection() {
  const matchingIndex = navigation.findIndex(link => link.hash === location.hash);
  const selected = matchingIndex === -1 ? 0 : matchingIndex;

  navigation.forEach((link, index) => {
    sections[index].hidden = index !== selected;
    if (index === selected) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  skills.hidden = sections[selected].id !== 'experience';
}

navigation.forEach(link => {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    showSection();
    const section = document.getElementById(link.hash.slice(1));
    section.scrollIntoView({ block: 'start' });
  });
});

window.addEventListener('hashchange', showSection);
showSection();
