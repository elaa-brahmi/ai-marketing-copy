export const containerVariants={
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.2,
            delayChildren:0.1,
            
        },

    },
};
export const itemVariants={
    hidden:{opacity:0,y:10},
    visible:{
        opacity:1,
        transition:{
            type:'spring' as const,
            damping:15,
            stiffness:50,
            duration:0.9

        },

    },
}
export const variants = {
     transition:{
            type:'linear' as const},
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
