import React, { ChangeEvent } from "react";

// Components
import FormComponentDropdownList from "../FormComponent/FormComponentDropdownList/FormComponentDropdownList";
import FormComponentEmbed from "../FormComponent/FormComponentEmbed/FormComponentEmbed";
import FormComponentImages from "../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentList from "../FormComponent/FormComponentList/FormComponentList";
import FormComponentNumberInput from "../FormComponent/FormComponentNumberInput/FormComponentNumberInput";
import FormComponentSocials from "../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentTextArea from "../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentTextInput from "../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentCheckbox from "../FormComponent/FormComponentCheckbox/FormComponentCheckbox";

// Types & Constants
import { Artist } from "../../types/models/Artist";
import { TAGS } from "../../constants/tags";
import { ARTIST_TYPES } from "../../constants/artistTypes";
import { STATE_CODE } from "../../constants/stateCode";
import { COUNTRY } from "../../constants/country";

interface FormArtistProps {
  artist: Artist;
  setArtist: React.Dispatch<React.SetStateAction<Artist>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormArtist: React.FC<FormArtistProps> = ({
  artist,
  setArtist,
  onChange
}) => {
  if (!artist) return null;

  return (
    <>
      <fieldset>
        <legend>Basic Information</legend>
        <div className="multipleComponentsWrapper">
          <FormComponentTextInput
            label="Title"
            name="title"
            value={artist.title}
            onChange={onChange}
          />
          <FormComponentNumberInput
            label="Year Founded"
            name="yearFounded"
            value={artist.yearFounded}
            onChange={onChange}
            min={1920}
            max={new Date().getFullYear()}
            numberType="year"
          />
          <FormComponentDropdownList
            label="Country"
            name="country"
            value={artist.country}
            onChange={onChange}
            options={COUNTRY}
          />
          <FormComponentTextInput
            label="City"
            name="city"
            value={artist.city}
            onChange={onChange}
          />
          <FormComponentDropdownList
            label="State"
            name="stateCode"
            value={artist.stateCode}
            onChange={onChange}
            options={STATE_CODE}
          />
          <FormComponentTextArea
            label="Description"
            name="description"
            value={artist.description}
            onChange={onChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Toggles</legend>
          <FormComponentCheckbox
            label="Featured Artist"
            name="isFeatured"
            checked={artist.isFeatured}
            onChange={(e) => setArtist(prev => ({ ...prev, isFeatured: e.target.checked }))}
          />
      </fieldset>

      <fieldset>
        <legend>Socials</legend>
        <FormComponentSocials
          record={artist}
          setRecord={setArtist}
        />
      </fieldset>

      <fieldset>
        <legend>Images</legend>
        <FormComponentImages
          record={artist}
          setRecord={setArtist}
        />
      </fieldset>

      <fieldset>
        <legend>Tags</legend>
        <FormComponentList
          listName="tags"
          options={TAGS}
          record={artist}
          setRecord={setArtist}
        />
      </fieldset>

      <fieldset>
        <legend>Types</legend>
        <FormComponentList
          listName="types"
          options={ARTIST_TYPES}
          record={artist}
          setRecord={setArtist}
        />
      </fieldset>

      <fieldset>
        <legend>Embeds</legend>
        <div className="embedWrapper">
          <FormComponentEmbed
            label="Spotify"
            name="spotifyEmbedUrl"
            url={artist.spotifyEmbedUrl}
            onChange={onChange}
          />
          <FormComponentEmbed
            label="Youtube"
            name="youtubeEmbedUrl"
            url={artist.youtubeEmbedUrl}
            onChange={onChange}
          />
        </div>
      </fieldset>
    </>
  );
};

export default FormArtist;
