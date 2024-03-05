import '../styles/spinner.css'

const Spinner = () => {
  return (
    <div className="loading">
        <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Spinner