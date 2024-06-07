from rest_framework import serializers
from usuarios.models import NewUser

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewUser
        fields = ('email', 'alias_usuario', 'password')
        extra_kwargs = {'password' : {'write_only': True}}
        
        
    def crear(self, datos_validados):
        password = datos_validados.get('password', None)
        instancia = self.Meta.model(**datos_validados)
        if password is not None:
            instancia.set_password(password)
        instancia.save()
        return instancia