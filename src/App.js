import React from 'react';
import vmsg from 'vmsg'


const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})

class App extends React.Component {

  state = {
    isLoading:false,
    isRecording: false,
    recordings: []
  }

  record = async () => {
    this.setState({isLoading:true})

    if(this.state.isRecording) {
      const audio = await recorder.stopRecording()
      this.setState({
        isLoading:false,
        isRecording: false,
        recordings: this.state.recordings.concat(URL.createObjectURL(audio))
      })
    }
    else {
      try {
        await recorder.initAudio()
        await recorder.initWorker()
        recorder.startRecording()
        this.setState({
          isLoading: false,
          isRecording: true
        })
      } catch (error) {
        console.log(error)
        this.setState({
          isLoading: false
        })
      }
    }
  }

  render() {
    // Destructuring the state object value/key
    const {isLoading, isRecording, recordings} = this.state

    
    return (
      <React.Fragment>
        <button disbaled={isLoading} onClick={this.record}>
          {isRecording ? 'Stop' : 'Record'}
        </button>

        {/* Display recordings */}
        <ul style={{listStyle:'none', padding: 0}}>
            {recordings.map(url => (
            <li key={url}>
              <audio src={url} controls></audio> 
            </li>
            ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default App;