<template>
  <div class="about-view">
    <div class="content-card">
      <h1 class="page-title">👥 О нас</h1>
      <div class="about-content">
        <div class="about-section">
          <h2>🎯 Наша миссия</h2>
          <p>Мы создали Аудиотеку с целью предоставить удобный доступ к лучшим произведениям музыки и литературы в одном месте. Наша платформа объединяет культурное наследие и современные технологии.</p>
        </div>
        <div class="about-section">
          <h2>📊 Что мы предлагаем</h2>
          <ul class="features-list">
            <li>🎵 Богатая коллекция музыкальных произведений</li>
            <li>📚 Обширная библиотека книг различных жанров</li>
            <li>⚡ Быстрый и удобный поиск</li>
            <li>🔐 Безопасную систему хранения данных</li>
            <li>📱 Адаптивный дизайн для всех устройств</li>
          </ul>
        </div>
        <div class="about-section">
          <h2>🛠️ Технологии</h2>
          <div class="tech-stack">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span>Vue.js 3</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🗄️</span>
              <span>SQLite</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span>CSS3</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔐</span>
              <span>JWT Auth</span>
            </div>
          </div>
        </div>
        <div class="about-section">
          <h2>🌟 Наша команда</h2>
          <p>Мы - команда энтузиастов, passionate about creating digital solutions that make culture and knowledge accessible to everyone. Our team consists of experienced developers and designers who care about user experience.</p>
          
          <!-- Новый блок с фотографиями команды -->
          <div class="team-section">
            <h3>👨‍💻👩‍💻 Познакомьтесь с нашей командой</h3>
            <div class="team-grid">
              <div class="team-member" v-for="member in teamMembers" :key="member.id">
                <img :src="member.photo" :alt="member.name" class="team-photo" />
                <h4>{{ member.name }}</h4>
                <p class="team-role">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutView',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Алексей Иванов',
          role: 'Lead Developer',
          photo: 'https://cre.ru/content/upload/event/speaker/mid/17181035996696.JPG'
        },
        {
          id: 2,
          name: 'Мария Петрова',
          role: 'UI/UX Designer',
          photo: 'https://pp.userapi.com/c4946/u67436402/a_890864a0.jpg'
        },
        {
          id: 3,
          name: 'Дмитрий Смирнов',
          role: 'Backend Engineer',
          photo: 'https://avatars.mds.yandex.net/get-sprav-products/9854027/2a000001893a141ee32b9aa091f359bc61db/M_height'
        },
        {
          id: 4,
          name: 'Анна Козлова',
          role: 'Frontend Developer',
          photo: 'https://yandex-images.clstorage.net/qxHB55145/8b16cacRK9M/9u64qv6uTk7Ili6IpT-jhDEU2ahpcKz7g_LO068fdVEWMegWdm6kN4zyDgbb7ZutRpbw4GUfciRbki71m9b8XGK_7LuvKR5NjwXpCaJt58An1BhpqzFsbZYqVZuzQ-6Ozq_0HGnp8GBMZUhAyzwAt5eEOnyhyObzyse45AucK42143ioe_kLQ4CG7sUkN64CphVepfE_PbUM5poesUHphoehPxIgJvKhhebK10k0BX0Dw3nwpgqhPM7GfigNHmeJtO5-7_Z5RIyKTmnKIvisSqbbFuT6ODh6QawXG7eFLAgDYHvXJ2r-KQGiTNMGeQJwCYM5tm_IIXWLzjCnTVtqiPui8-x8fUGNjM3kQGKy6QHu1RQoOPI6uIAtGVFyh-VBgKA3GuPj-m_HJYqTxrNCfQUAvHlpgyJ1BEf-o8xWpAE7qHCtuHBARwBAogCkfubDZpEUrvI4c_PGp9kRcAnpAcxs9hyrLrhmRCTMl0y7gT2CiHq5o4omOMeHfatFmusFNeF-aPR5TEMOw6hFJDihQWYRVmW-Mjk0AauWWf1P6Y9PbznSI-cxYYhvyp7P9E30R8M88msN7zgEBnFoT1FlQDTt9Cqx_gdGT81ujKX66cnmFFWn-nK9eYNg2p8wRusMjqb-l6BsOu9JYcwbzbWO_cMD8P2oDyF1Swr3o4NaK0Q15nMiObfGwYGIJIIiduSLodOaJbs0_3pILl8ZcIgiQQ9vtJrna7xlj29Ck468TXnHwnZwYQCv9YYDeSGCV65Hda0yqPN3SISADWGFZX8hiGjcU6_wtnk_SaFX3XvHIoDHq7DaaCfzJ4DshdhM8gx4jMO0vGdNLfjIAXtlS9_uQL4vO233v4aKxYbiQmV9o05jUdpmf7dweUFhFhO9SK_JTGz23u7h-agF7QSZCTDOPI_L-LZsj64xxgZ6q8xc40NwLjArur1AC4kDqoSs9StOa5wdYDCyd30BaVPQd4'
        },
        {
          id: 5,
          name: 'Сергей Новиков',
          role: 'QA Engineer',
          photo: 'https://avatars.mds.yandex.net/i?id=95c5c81b193fda75030091cb73f6bf3d_sr-5268458-images-thumbs&n=13'
        }
      ]
    }
  }
}
</script>
<style scoped>
.about-content {
  max-width: 800px;
  margin: 0 auto;
}
.about-section {
  margin-bottom: 3rem;
}
.about-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}
.about-section p {
  color: #7f8c8d;
  line-height: 1.8;
  font-size: 1.1rem;
}
.features-list {
  list-style: none;
  padding: 0;
}
.features-list li {
  padding: 0.5rem 0;
  color: #7f8c8d;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
.tech-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.tech-item:hover {
  transform: translateY(-2px);
}
.tech-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* Стили для раздела команды */
.team-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #ecf0f1;
}
.team-section h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}
.team-member {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
.team-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3498db;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}
.team-member:hover .team-photo {
  border-color: #e74c3c;
  transform: scale(1.05);
}
.team-member h4 {
  color: #2c3e50;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.team-role {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .tech-stack {
    grid-template-columns: repeat(2, 1fr);
  }
  .about-section h2 {
    font-size: 1.5rem;
  }
  .about-section p {
    font-size: 1rem;
  }
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }
  .team-photo {
    width: 120px;
    height: 120px;
  }
  .team-member h4 {
    font-size: 1.1rem;
  }
}
</style>