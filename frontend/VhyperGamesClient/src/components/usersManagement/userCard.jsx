

function UserCard(imgUrl, name, email, rol) {

    return (
        <article>

            <img src={imgUrl} alt="user icon" className={classes.userIcon} />

            <div className={classes.nameContainer}>
                <h2 className={classes.containerTitle}>Usuario</h2>
                <p className={classes.name}>{name}</p>
            </div>

            <div className={classes.emailContainer}>
                <h2 containerTitle>Correo Electrónico</h2>
                <p className={classes.precio}>{email} €</p>
            </div>

            <div className={classes.rolContainer}>
                <h2 containerTitle>Rol</h2>
                <p className={classes.stock}>{rol}</p>
            </div>

            <button>
                {/* <img src="" alt="ir a vista usuario" /> */}
                Ir a vista usuario
            </button>

            <button>
                {/* <img src="" alt="borrar usuario" /> */}
                borrar usuario
            </button>

        </article>
    );

}

export default UserCard