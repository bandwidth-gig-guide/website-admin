interface Social {
  socialPlatform: string;
  handle: string;
  url: string;
}

interface Props {
  socials: Social[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof Social, value: string) => void;
}

const FormComponentSocials: React.FC<Props> = ({ socials, onAdd, onRemove, onChange }) => (
  <fieldset>
    <legend>Socials</legend>
    {socials.map((social, idx) => (
      <div key={idx}>
        <input
          placeholder="Platform"
          value={social.socialPlatform}
          onChange={e => onChange(idx, "socialPlatform", e.target.value)}
        />
        <input
          placeholder="Handle"
          value={social.handle}
          onChange={e => onChange(idx, "handle", e.target.value)}
        />
        <input
          placeholder="URL"
          value={social.url}
          onChange={e => onChange(idx, "url", e.target.value)}
        />
        <button type="button" onClick={() => onRemove(idx)}>Remove</button>
      </div>
    ))}
    <button type="button" onClick={onAdd}>Add Social</button>
  </fieldset>
);

export default FormComponentSocials;
