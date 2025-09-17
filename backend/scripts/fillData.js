const sequelize = require('../models/database');
const Music = require('../models/Music');
const Books = require('../models/Books');

async function fillData() {
  try {
    await sequelize.sync({ force: false });
    console.log('База данных подключена');

    // Очищаем существующие данные
    await Music.destroy({ where: {} });
    await Books.destroy({ where: {} });
    console.log('Старые данные очищены');

    // Данные для генерации
    const musicGenres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Country', 'R&B', 'Reggae', 'Metal'];
    const musicArtists = [
      'The Beatles', 'Queen', 'Michael Jackson', 'Madonna', 'Elvis Presley',
      'Led Zeppelin', 'Pink Floyd', 'David Bowie', 'Prince', 'Bob Dylan',
      'Radiohead', 'Coldplay', 'Beyoncé', 'Adele', 'Taylor Swift',
      'Ed Sheeran', 'Billie Eilish', 'Dua Lipa', 'The Weeknd', 'Arctic Monkeys'
    ];

    const musicAlbums = [
      'Abbey Road', 'The Dark Side of the Moon', 'Thriller', 'Rumours', 'Back in Black',
      'The Joshua Tree', 'Nevermind', 'OK Computer', 'Hotel California', 'Born to Run',
      'Purple Rain', 'The Wall', 'A Night at the Opera', 'Led Zeppelin IV', 'Pet Sounds',
      'Revolver', 'Blood on the Tracks', 'The Rise and Fall of Ziggy Stardust', 'London Calling', 'Automatic for the People'
    ];

    const musicTitles = [
      'Bohemian Rhapsody', 'Hotel California', 'Imagine', 'Like a Rolling Stone', 'Yesterday',
      'Smells Like Teen Spirit', 'One', 'Billie Jean', 'Stairway to Heaven', 'Sweet Child O\' Mine',
      'Hey Jude', 'Wonderwall', 'Sweet Home Alabama', 'Let It Be', 'Shape of You',
      'Blinding Lights', 'Bad Guy', 'Dance Monkey', 'Watermelon Sugar', 'Levitating',
      'Stay', 'Save Your Tears', 'Good 4 U', 'Butter', 'Industry Baby',
      'Easy On Me', 'Stay', 'Shivers', 'Heat Waves', 'As It Was'
    ];

    const bookGenres = ['Роман', 'Фантастика', 'Детектив', 'Ужасы', 'Фэнтези', 'Биография', 'История', 'Поэзия', 'Драма', 'Комедия'];
    const bookAuthors = [
      'Лев Толстой', 'Фёдор Достоевский', 'Антон Чехов', 'Александр Пушкин',
      'Николай Гоголь', 'Иван Тургенев', 'Михаил Булгаков', 'Александр Солженицын',
      'Владимир Набоков', 'Стивен Кинг', 'Джоан Роулинг', 'Джордж Оруэлл',
      'Эрнест Хемингуэй', 'Агата Кристи', 'Дэн Браун', 'Харуки Мураками',
      'Джон Толкин', 'Айзек Азимов', 'Рэй Брэдбери', 'Джек Лондон'
    ];

    const bookPublishers = [
      'АСТ', 'Эксмо', 'Просвещение', 'Росмэн', 'Дрофа',
      'Азбука', 'Лениздат', 'Молодая гвардия', 'Вече', 'Центрполиграф',
      'Random House', 'Penguin', 'HarperCollins', 'Simon & Schuster'
    ];

    const bookTitles = [
      'Война и мир', 'Преступление и наказание', 'Анна Каренина', 'Мастер и Маргарита',
      'Тихий Дон', 'Доктор Живаго', 'Евгений Онегин', 'Отцы и дети', 'Мёртвые души',
      'Идиот', 'Братья Карамазовы', 'Герой нашего времени', 'Обломов', 'Отверженные',
      '1984', 'Улисс', 'Властелин колец', 'Гарри Поттер', 'Над пропастью во ржи',
      'Великий Гэтсби', 'Тёмные начала', 'Атлант расправил плечи', 'Алиса в Стране чудес',
      'Гордость и предубеждение', 'Дюна', 'Фундамент', 'Ночной дозор', 'Метро 2033',
      'Пикник на обочине', 'Солярис'
    ];

    // Генерация музыки
    const musicData = [];
    for (let i = 1; i <= 100; i++) {
      const artist = musicArtists[Math.floor(Math.random() * musicArtists.length)];
      const title = musicTitles[Math.floor(Math.random() * musicTitles.length)];
      
      musicData.push({
        title: `${title} ${Math.random() > 0.7 ? 'Part ' + (Math.floor(Math.random() * 3) + 1) : ''}`,
        artist: artist,
        album: Math.random() > 0.2 ? musicAlbums[Math.floor(Math.random() * musicAlbums.length)] : null,
        duration: Math.floor(Math.random() * 480) + 120, // 2-10 минут
        genre: musicGenres[Math.floor(Math.random() * musicGenres.length)],
        year: Math.floor(Math.random() * 65) + 1960, // 1960-2025
        photo: `https://picsum.photos/300/300?random=${i}&seed=music`,
        description: `Захватывающая композиция в стиле ${musicGenres[Math.floor(Math.random() * musicGenres.length)]}. Исполняет ${artist}.`,
        filePath: `/music/${artist.toLowerCase().replace(/\s+/g, '_')}_${title.toLowerCase().replace(/\s+/g, '_')}.mp3`
      });
    }

    await Music.bulkCreate(musicData);
    console.log('100 музыкальных записей создано');

    // Генерация книг
    const booksData = [];
    for (let i = 1; i <= 100; i++) {
      const author = bookAuthors[Math.floor(Math.random() * bookAuthors.length)];
      const title = bookTitles[Math.floor(Math.random() * bookTitles.length)];
      
      booksData.push({
        title: `${title}${Math.random() > 0.8 ? ': ' + ['Том', 'Часть', 'Книга'][Math.floor(Math.random() * 3)] + ' ' + (Math.floor(Math.random() * 3) + 1) : ''}`,
        author: author,
        publisher: bookPublishers[Math.floor(Math.random() * bookPublishers.length)],
        pages: Math.floor(Math.random() * 900) + 100, // 100-1000 страниц
        genre: bookGenres[Math.floor(Math.random() * bookGenres.length)],
        year: Math.floor(Math.random() * 225) + 1800, // 1800-2025
        photo: `https://picsum.photos/300/400?random=${i + 100}&seed=books`,
        description: `Увлекательная книга в жанре ${bookGenres[Math.floor(Math.random() * bookGenres.length)]}. Автор: ${author}. ${['Захватывающий сюжет', 'Интересные персонажи', 'Глубокий смысл', 'Неожиданная развязка'][Math.floor(Math.random() * 4)]}.`,
        filePath: `/books/${author.toLowerCase().replace(/\s+/g, '_')}_${title.toLowerCase().replace(/\s+/g, '_')}.pdf`
      });
    }

    await Books.bulkCreate(booksData);
    console.log('100 книжных записей создано');

    console.log('✅ Все данные успешно заполнены!');
    console.log('🎵 Музыка: 100 записей');
    console.log('📚 Книги: 100 записей');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Ошибка заполнения данных:', error);
    process.exit(1);
  }
}

fillData();