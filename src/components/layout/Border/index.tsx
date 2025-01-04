import React from 'react';
import styles from "@/components/layout/Border/style.module.css"
import Image from 'next/image';
import BackgroundImageDark from "../../../../public/bg-desktop-dark.jpg"
import BackgroundImageLight from  "../../../../public/bg-desktop-light.jpg"

const Border = () => {
  return (
    <div className={styles.container}>

        <div className={styles.image}>
            <Image src={ BackgroundImageDark } alt="" width={1540} height={320} />
        </div>


    </div>
  )
}

export default Border;