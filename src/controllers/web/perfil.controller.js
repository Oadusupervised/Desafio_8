export function profileView(req, res) {
  res.render('profile', {
    pageTitle: 'Perfil', user: req.session['user']
  })
}