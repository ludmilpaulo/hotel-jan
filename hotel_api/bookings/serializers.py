from rest_framework import serializers
from .models import Booking
from datetime import date

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        room = data["room"]
        check_in = data["check_in"]
        check_out = data["check_out"]

        # check-in não pode ser no passado
        if check_in < date.today():
            raise serializers.ValidationError(
                {"error": "Não é possível reservar no passado."}
            )

        # check-in deve ser antes do check-out
        if check_in >= check_out:
            raise serializers.ValidationError(
                {"error": "A data de entrada deve ser antes da saída."}
            )

        # verificar sobreposição de reservas
        overlapping = Booking.objects.filter(
            room=room,
            check_in__lt=check_out,
            check_out__gt=check_in
        )

        if overlapping.exists():
            reserved_ranges = [
                {"check_in": b.check_in, "check_out": b.check_out}
                for b in overlapping
            ]
            raise serializers.ValidationError({
                "error": "Esse quarto já está reservado nesse período.",
                "reserved": reserved_ranges,
                "message": "Escolha outras datas disponíveis."
            })

        return data
