import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { urqlClient, getPublications, getProfiles } from '../../api'
import Image from 'next/image'
import one from './1.png'
import two from './2.png'
import three from './3.png'
import foor from './4.png'

export default function Profile() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])
  async function fetchProfile() {
    const returnedProfile = await urqlClient.query(getProfiles, { id }).toPromise();
    const profileData = returnedProfile.data.profiles.items[0]
    profileData.color = generateRandomColor()
    setProfile(profileData)
    console.log('returnedProfile: ', returnedProfile)
    const pubs = await urqlClient.query(getPublications, { id, limit: 50 }).toPromise()
    console.log('pubs: ', pubs)
    setPublications(pubs.data.publications.items)
  }

  if (!profile) return null

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...headerStyle,
          backgroundImage: `url(${profile.coverPicture?.original.url})`,
          backgroundColor: profile.color
        }}
      >
      </div>
      <div style={columnWrapperStyle}>
        <div style={leftColumnStyle}>
          <img style={{
            ...profileImageStyle,
            backgroundColor: profile.color
          }} src={profile.picture?.original?.url} />
          <h3 style={nameStyle}>{profile.name}</h3>
          <p style={handleStyle}>{profile.handle}</p>

          <div className="flex-container">
            <div>
              <h3 style={{ color: 'grey', marginRight: '90px' }}>Topics</h3>
              <p>Investing</p>
              <p>NFT's</p>
              <p>Women in Web3</p>
              <p>Education</p>
            </div>
            <div>
              <h3 style={{ color: 'grey' }}>Badges</h3>
              <p>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </p>
              <p>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
              </p>
              <p>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
                <span class="dot accomplished"></span>
                <span class="dot"></span>
              </p>
              <p>
                <span class="dot accomplished"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </p>
            </div>

          </div>
        </div>
        <div style={rightColumnStyle}>
          <h3 style={postHeaderStyle}>Posts</h3>
          {
            publications.map((pub, index) => (
              <div style={publicationWrapper} key={index}>
                <p style={latestPostStyle}>{pub.metadata.content}</p>
              </div>
            ))
          }
          <h3 style={postHeaderStyle}>Tags</h3>
          <div>
            <button class="button-8" role="button">Investment</button>
            <button class="button-8" role="button">Technology</button>
            <button class="button-8" role="button">DAO</button>
          </div>
          <br />
          <h3 style={postHeaderStyle}>Badges</h3>
          <div style={badges}>
            <div style={badgewrap}>
              <Image src={one} alt="" height={100} width={100} className="badge" />
              <p style={{marginLeft: '5px'}}>education</p>
            </div>
            <div style={badgewrap}>
              <Image src={two} alt="" height={100} width={100} className="badge" />
              <p style={{marginLeft: '15px'}}>Investing</p>
            </div>
            <div style={badgewrap}>
              <Image src={three} alt="" height={100} width={100} className="badge" />
              <p>women in Web3</p>
            </div>
            <div style={badgewrap}>
              <Image src={foor} alt="" height={100} width={100} className="badge" />
              <p style={{marginLeft: '30px'}}>NFT's</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const badges = {
  display: 'flex'
}

const badgewrap = {
  marginRight: "10px"
}

const postHeaderStyle = {
  margin: '0px 0px 15px'
}

function generateRandomColor() {
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`
}

const publicationWrapper = {
  backgroundColor: 'white',
  marginBottom: '15px',
  padding: '10px 20px',
  borderRadius: '15px',
  border: '1px solid #ededed'
}

const latestPostStyle = {}

const nameStyle = {
  margin: '15px 0px 5px'
}

const handleStyle = {
  margin: '0px 0px 5px',
  color: '#b900c9'
}

const headerStyle = {
  width: '900px',
  maxHeight: '300px',
  height: '300px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const profileImageStyle = {
  width: '200px',
  height: '200px',
  maxWidth: '200px',
  border: '10px solid white',
  borderRadius: '12px',
}

const columnWrapperStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row'
}

const leftColumnStyle = {}

const rightColumnStyle = {
  marginLeft: '20px',
  flex: '1'
}

const containerStyle = {
  width: '900px',
  margin: '0 auto',
  padding: '50px 0px'
}