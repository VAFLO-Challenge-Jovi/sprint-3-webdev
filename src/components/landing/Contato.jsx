import { CircleCheck, Mail, MapPin, Send } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';
import GithubIcon from '../ui/GithubIcon.jsx';
import { CONTACT } from '../../data/landing.js';
import { useContactForm } from '../../hooks/useContactForm.js';

const CHANNELS = [
  { icon: Mail, label: 'E-mail', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: 'Onde estamos', value: CONTACT.location },
  { icon: GithubIcon, label: 'GitHub', value: 'VAFLO-Challenge-Jovi', href: CONTACT.github },
];

export default function Contato() {
  const { field, handleSubmit, submitting, formError, sentTo, closeConfirmation } = useContactForm();

  return (
    <section id="contato" className="bg-ink-900 py-20 lg:py-28" aria-labelledby="contato-title">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            id="contato-title"
            align="left"
            eyebrow="Contato"
            title="Bora conversar?"
            description="Dúvidas, feedback sobre o protótipo ou interesse na solução — a equipe responde rapidinho."
          />
          <ul className="grid gap-3">
            {CHANNELS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-ink-850 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/6 text-volt-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-fg-subtle">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="truncate font-medium hover:text-volt-300">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulário de contato"
          className="grid gap-5 rounded-4xl border border-white/8 bg-ink-850 p-6 sm:grid-cols-2 sm:p-8 lg:col-span-7"
        >
          <TextField label="Nome" placeholder="Seu nome" autoComplete="name" {...field('name')} />
          <TextField label="E-mail" type="email" placeholder="voce@email.com" autoComplete="email" {...field('email')} />
          <TextField label="Assunto" as="select" className="sm:col-span-2" {...field('subject')}>
            <option>Feedback</option>
            <option>Dúvida</option>
            <option>Parceria</option>
            <option>Outro</option>
          </TextField>
          <TextField label="Mensagem" as="textarea" rows={5} placeholder="Escreva sua mensagem" className="sm:col-span-2" {...field('message')} />
          {formError && <p className="text-sm text-rose-300 sm:col-span-2" role="alert">{formError}</p>}
          <Button type="submit" size="lg" icon={Send} loading={submitting} className="sm:col-span-2 sm:justify-self-start">
            Enviar mensagem
          </Button>
        </form>
      </div>

      <Modal
        open={Boolean(sentTo)}
        onClose={closeConfirmation}
        icon={CircleCheck}
        title={`Valeu, ${sentTo}!`}
        description="Recebemos sua mensagem. O time SeekVision responde em breve no e-mail informado."
      >
        <Button block onClick={closeConfirmation} autoFocus>
          Fechar
        </Button>
      </Modal>
    </section>
  );
}
