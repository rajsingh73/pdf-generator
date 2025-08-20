import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    receiptId: '',
    price1: '',
    price2: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createAndDownloadPdf = () => {
    axios.post('/create-pdf', formData)
      .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
      .catch((err) => console.error('PDF generation failed:', err));
  };

  return (
    <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={handleChange} />
      <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
      <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
      <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
