import React from 'react';
import './Ville.css';
import rabat from '../../assets/rabat.jpg';
import marrakech from '../../assets/marrakech.jpg';
import agadir from '../../assets/agadir.jpg';
import tanger from '../../assets/tanger.jpeg';
import fes from '../../assets/fes.jpeg';
import {Link} from "react-router-dom";
import { motion } from "framer-motion";





const Ville = () => {
    const text = "Choisir la ville Correspondante : ".split(" ");


    return (
        <>
            <h1 className="ml-8 mt-6 text-xl font-bold hh">{text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: i / 5,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}</h1>
            <div className="grid grid-cols-5 mt-9">
			
				<Link to="/explore/marrakech" >
                <div className="col-span-1 flex justify-center items-center flex-col hover:underline">
                    <motion.div
                     whileHover={{ scale: 1.1 }}
                     onHoverStart={e => {}}
                     onHoverEnd={e => {}}
                     className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center ima">
                        <img src={marrakech} alt="Marrakech" style={{ maxHeight: '100%', maxWidth: 'none' }} className="w-auto h-auto" />
                    </motion.div>
                    <p className="mt-2 font-bold">Marrakech</p>
                </div>
				</Link>
				
                <Link to="/explore/rabat" >
                <div className="col-span-1 flex justify-center items-center flex-col hover:underline">
                    <motion.div
                     whileHover={{ scale: 1.1 }}
                     onHoverStart={e => {}}
                     onHoverEnd={e => {}}
                     className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center rabat">
                        <img src={rabat} alt="Rabat" className="w-auto h-auto" style={{ maxHeight: '100%', maxWidth: 'none' }} />
                    </motion.div>
                    <p className="mt-2 font-bold">Rabat</p>
                </div>
				</Link>
				
                <Link to="/explore/agadir" >
                <div className="col-span-1 flex justify-center items-center flex-col hover:underline">
                    <motion.div 
                     whileHover={{ scale: 1.1 }}
                     onHoverStart={e => {}}
                     onHoverEnd={e => {}}
                    className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center agadir">
                        <img src={agadir} alt="Agadir" className="w-auto h-auto" style={{ maxHeight: '100%', maxWidth: 'none' }} />
                    </motion.div>
                    <p className="mt-2 font-bold">Agadir</p>
                </div>
				</Link>
				
                <Link to="/explore/tanger" >
                <div className="col-span-1 flex justify-center items-center flex-col hover:underline">
                    <motion.div
                     whileHover={{ scale: 1.1 }}
                     onHoverStart={e => {}}
                     onHoverEnd={e => {}}
                     className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center tanger">
                        <img src={tanger} alt="Tanger" className="w-auto h-auto" style={{ maxHeight: '100%', maxWidth: 'none' }} />
                    </motion.div>
                    <p className="mt-2 font-bold">Tanger</p>
                </div>
				</Link>
				
                <Link to="/explore/fes" >
                <div className="col-span-1 flex justify-center items-center flex-col hover:underline">
                    <motion.div
                     whileHover={{ scale: 1.1 }}
                     onHoverStart={e => {}}
                     onHoverEnd={e => {}}
                     className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center ima">
                        <img src={fes} alt="Fes" className="w-auto h-auto" style={{ maxHeight: '100%', maxWidth: 'none' }} />
                    </motion.div>
                    <p className="mt-2 font-bold">Fes</p>
                </div>
				</Link>
				
            </div>
        </>
    )
}

export default Ville;
