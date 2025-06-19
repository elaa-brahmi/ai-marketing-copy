export const containerVariants={
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.2,
            delayChildren:0.1
        },

    },
};
export const itemVariants={
    hidden:{opacity:0,y:10},
    visible:{
        opacity:1,
        transition:{
            type:'spring',
            damping:15,
            stiffness:50,
            duration:0.9

        },

    },
}

