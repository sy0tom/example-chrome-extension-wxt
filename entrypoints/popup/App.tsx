function App() {
  const onClickOpenOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <>
      <p className="bg-red-500">hello world!</p>
      <button onClick={onClickOpenOptionsPage}>open settings</button>
    </>
  );
}

export default App;
