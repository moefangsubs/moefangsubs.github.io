    const buttonTrakteer = document.querySelector('.button--trakteer');

    buttonTrakteer.addEventListener('mouseover', () => {
      const traksElement = buttonTrakteer.querySelector('.traks');
      traksElement.classList.add('filter-hover');
    });

    buttonTrakteer.addEventListener('mouseout', () => {
      const traksElement = buttonTrakteer.querySelector('.traks');
      traksElement.classList.remove('filter-hover');
    });