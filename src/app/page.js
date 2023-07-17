'use client';
import { useState, useEffect } from "react";
import {Button, ConfigProvider, Modal, Row, Col} from "antd";
import './styles.css';
import PreLoader from "./PreLoader";

export default function Home() {
  const [showArtistNames, setArtistNames] = useState([]);
  const [showImage, setImage] = useState('');
  const [showLink, setLink] = useState('');
  const [showButton, setShowButton] = useState(false);
  // Get it from spotify developer account
  const CLIENT_ID = ''
  const CLIENT_SECRET = ''
  const[accessToken, setaccessToken] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
 
   useEffect(() => {
    //GETTING API TOKEN 
    var authParam = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParam)
      .then(result => result.json())
      .then(data => setaccessToken(data.access_token))
  }, [])


  const getTrack = (mood) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
   
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    

    fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${mood}&limit=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const tracks = result.tracks[0];
        const link1 = tracks.album.external_urls.spotify;
        const image1 = tracks.album.images[0].url
        const FirstArtist = tracks.album.artists[0];
        const Artists = tracks.album.artists;
        let artist;
        let temp = []
        for (artist of Artists){
          console.log(artist.name)
          temp.push(artist.name);

        }
        setArtistNames(temp)
        setImage(image1)
        setLink(link1)
        setShowButton(true)
      })
      .catch((error) => console.log("error", error));
   
      setIsModalOpen(true);

  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <main style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <PreLoader/>

       <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#0E2954',
      },
    } }>
<div>
    <div classname = 'header' >
      <div>
        <h1 className="h1" >How Are You Feeling Today?</h1>
        <br/>
        <br/>
        <br/>

        <Row gutter={[50]} justify={"center"} style={{marginTop: '20px'}}>
          <Col >
            <div><Button  style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('acoustic%2Cambient') }}>Calm</Button> </div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() =>  { getTrack('blues%2Cfolk') }}>Nostalgic</Button></div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('alt-rock%2Cpunk-rock') }}>Rebellious</Button></div>
          </Col>
        </Row>
      <br/>
      <br/>
      <br/>

        <Row gutter={[50]} justify={"center"} style={{marginTop: '20px'}}>
          <Col >
            <div><Button  style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('gospel%2Cpop') }}>Exhilarated</Button></div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('afrobeat%2Cdance') }}>Energetic</Button> </div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('reggae%2Cska') }}>Joyful</Button></div>
          </Col>

        </Row>
        <br/>
        <br/>
        <br/>

        <Row gutter={[50]} justify={"center"} style={{marginTop: '20px'}}>
          <Col >
            <div><Button  style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('heavy-metal%2Cindustrial') }}>Intense</Button></div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('hip-hop%2Cr-n-b') }}>Empowered</Button> </div>
          </Col>
          <Col>
          <div> <Button style={{fontSize: '40px', height: '100px'}} type="primary" onClick={() => { getTrack('emo%2Cindie') }}>Melancholic</Button></div>
          </Col>
        </Row>

      {/* <Row gutter={[1, 1]}>
        <Col className="gutter-row" span={1}>
        </Col>
        <Col className="gutter-row" span={1}>
        </Col>
        <Col className="gutter-row" span={1}>
        </Col>
        <Col className="gutter-row" span={1}>
          <div> <Button size='large' type="primary" onClick={() => { getTrack('blues%2Cfolk') }}>Nostalgic</Button></div>
        </Col>
        <Col className="gutter-row" span={1}>
          <div> <Button size='large' type="primary" onClick={() => { getTrack('gospel%2Cpop') }}>Uplifting</Button></div>
        </Col>
        <Col className="gutter-row" span={1}>
          <div> <Button size='large' type="primary" onClick={() => { getTrack('heavy-metal%2Cindustrial') }}>Intense</Button></div>
        </Col>
        <Col className="gutter-row" span={1}>
          <div> <Button size='large' type="primary" onClick={() => { getTrack('reggae%2Cska') }}>Joyful</Button></div>
        </Col>
        <Col className="gutter-row" span={1}>
          <div> <Button size='large' type="primary" onClick={() => { getTrack('reggae%2Cska') }}>Joyful</Button></div>
        </Col>
      </Row> */}
      </div>
  
      <Modal style={{ top: -350 }} width={800}  height={200} centered  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {showButton && (
          <div>
            <h2 style={{ color: '#063747', marginBottom: '10px' }}>{'Artist(s): ' + showArtistNames.join(' | ')}</h2>

            <img width="100%" height='auto' src={showImage} alt="artist" />
            <div>
              {showButton && (
                <a href={showLink} target="_blank">
                  <Button size='large' type="primary">Spotify Link</Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      </Modal>


    </div>
    </div>
    </ConfigProvider>
    
  </main>
  
  );
}