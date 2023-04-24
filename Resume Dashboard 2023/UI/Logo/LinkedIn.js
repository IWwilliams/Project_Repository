import classes from "../Logo/LinkedIn.module.css"
function LinkedIn(props){
    return(
        <div className={`${classes['linkedin-icon-bg']} ${props.className}` }>
            <div className={`${classes['i-col']}` }>
                <div className={`${classes['dot']}` }></div>
                <div className={`${classes['i']}` }></div>
            </div>
            <div className={`${classes['n-col']}`}>
                <div className={`${classes['n']}` }></div>
                <div className={`${classes['n-hump']}` }></div>
                <div className={classes['n-gap']}></div>
            </div>
        </div>
    )
}
export default LinkedIn;