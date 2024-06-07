import os
import requests
from PIL import Image
from io import BytesIO
from django.core.files import File
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, alias_usuario, nombre, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, alias_usuario, nombre, password, **other_fields)

    def create_user(self, email, alias_usuario, nombre, password, **other_fields):

        if not email:
            raise ValueError(_('El e-mail es obligatorio'))

        email = self.normalize_email(email)
        user = self.model(email=email, alias_usuario=alias_usuario,
                          nombre=nombre, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    id_usuario = models.AutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True)
    alias_usuario = models.CharField(max_length=150, unique=True)
    nombre = models.CharField(max_length=150, blank=True)
    apellido_primero = models.CharField(max_length=150, blank=True)
    apellido_segundo = models.CharField(max_length=150, blank=True)
    fecha_nacimiento = models.DateField(_('fecha de nacimiento'), null=True, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    foto_usuario = models.FileField(upload_to='user_photos/', null=True, blank=True)
    descripcion = models.TextField(_('descripcion'), max_length=300, blank=True)
    is_staff = models.BooleanField(default=False)
    # Este campo es para que el usuario vaya a su correo y haga click confirmando que es él
    # Ahora lo vamos a dejar en True, pero para esto deberá ser False
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'alias_usuario'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.alias_usuario

@receiver(post_save, sender=NewUser)
def set_default_user_photo(sender, instance, created, **kwargs):
    if created and not instance.foto_usuario:
        url = f"https://robohash.org/{instance.alias_usuario}?set=set4"
        response = requests.get(url)
        if response.status_code == 200:
            img_temp = BytesIO(response.content)
            img = Image.open(img_temp)
            file_name = f"{instance.alias_usuario}_robohash.png"
            img_io = BytesIO()
            img.save(img_io, format='PNG')
            instance.foto_usuario.save(file_name, File(img_io), save=True)
