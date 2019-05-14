import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { connect } from "react-redux";
import { thisTypeAnnotation } from "@babel/types";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  setTest,
  toggleDefinitionDisplay,
  transcriptionMasked,
  currentPage
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  startListening()
  return (
    <div>
      <button
        className="btn-floating btn-grey btn-sm waves-effect"
        onClick={() => {
          setTest(transcript);
          resetTranscript();
          toggleDefinitionDisplay(true)
        }}
      >
        {currentPage == "WhichWord"? "check definition": "submit"}
        <i className="far fa-hand-rock" />
      </button>
      <button
        className="btn-floating btn-grey btn-sm waves-effect"
        onClick={() => {
          resetTranscript()
          toggleDefinitionDisplay(false)
        }}
      >Say again <i className="fas fa-redo-alt" /></button>
      <br />
      <span id="transcript">
        {transcriptionMasked && maskTranscript(transcript)}
        {!transcriptionMasked && transcript}
      </span>

    </div>
  );
};

function maskTranscript (transcript) {
  let maskedTranscript = ''

  for(var i =0; i< transcript.length; i++){
    maskedTranscript += '*'
  }

  return maskedTranscript
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition({ autoStart: false })(Dictaphone);
