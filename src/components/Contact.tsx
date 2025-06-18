import { motion } from "motion/react";
import { ContactInfo } from '../models/ContactInfo';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
  
    const contact = t('contact', { returnObjects: true }) as ContactInfo;
    
    return (
        <div className="border-b border-neutral-900 pb-20">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-10 text-center text-4xl"
            >
                {t('getInTouch')}
            </motion.h1>
            <div className="text-center tracking-tighter">
                <motion.p
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    className="my-4"
                >
                    {contact.address}
                </motion.p>
                <motion.p
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 1 }}
                    className="my-4"
                >
                    {contact.phoneNo}
                </motion.p>
                <a href="#" className="border-b">
                    {contact.email}
                </a>
            </div>
        </div>
    );
};

export default Contact;
