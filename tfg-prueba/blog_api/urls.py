# API endpoints postlist y pordetail
# el primero nos da una primary key
# homepage el segundo
# un view nos enseña todo el contenido y otro alguno en detalle

from .views import CategoryList, CrearPost, EditarPerfil, EditarPost, EliminarPost, PostList, PostListDetailfilter, PerfilUsuario, UsuarioPostDetail
from django.urls import path
from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

router = DefaultRouter()
router.register('post', PostList, basename="post")

# urlpatterns = [
#     path('post/search/', PostSearch.as_view(), name='post-search'),
# ] + router.urls

urlpatterns = [
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('profile/<str:alias_usuario>/', PerfilUsuario.as_view(), name='perfilusuario'),
    path('profile/<int:pk>/edit/', EditarPerfil.as_view(), name='editarperfilusuario'),
    path('post/crear/', CrearPost.as_view(), name="crearpost"),
    path('post/edit/postdetail/<int:pk>/', UsuarioPostDetail.as_view(), name="usuariopostdetail"),
    path('post/edit/<int:pk>/', EditarPost.as_view(), name="editarpost"),
    path('post/delete/<int:pk>/', EliminarPost.as_view(), name="eliminarpost"),
    path('categories/', CategoryList.as_view(), name="categorylist"),
] + router.urls


# urlpatterns = [
#     path('post/', PostDetail.as_view(), name='detailcreate'),
#     path('search/', PostListDetailfilter.as_view(), name='postsearch'),
#     path('', PostList.as_view(), name='listcreate'),
# ]