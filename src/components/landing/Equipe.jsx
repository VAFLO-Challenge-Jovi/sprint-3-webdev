import SectionHeading from '../ui/SectionHeading.jsx';
import TeamCard from './TeamCard.jsx';
import { TEAM } from '../../data/landing.js';

export default function Equipe() {
  return (
    <section id="equipe" className="py-20 lg:py-28" aria-labelledby="equipe-title">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          id="equipe-title"
          eyebrow="Nossa Equipe"
          tone="iris"
          title="Quem constrói o SeekVision"
          description="Cinco estudantes de Engenharia de Software da FIAP — o próprio público-alvo da solução."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TEAM.map((member, i) => (
            <li key={member.rm}>
              <TeamCard {...member} accent={i % 2 === 0 ? 'volt' : 'iris'} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
