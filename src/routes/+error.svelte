<script>
    import {page} from "$app/state";
    import { Separator } from "$lib/components/ui/separator/index.js";
</script>



<div class="flex items-center justify-center h-full">
    <div class="flex items-center space-x-2 h-8">
        <div class="text-2xl">{page.status}</div>
        <Separator orientation="vertical" />
        <div class="text-2xl">{page.error.message}</div>
    </div>
</div>